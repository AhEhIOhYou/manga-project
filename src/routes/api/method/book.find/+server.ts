import type { FilterItemType, OrderByItemType } from '@/lib/server/domain/entities';
import { searchBooks } from '@/lib/server/infrastructure/persistence/book';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();

	const search = {};
	const filter = {};
	const orderBy = {};

	if (data.search) {
		search['OR'] = [
			{
				title: {
					contains: data.search,
					mode: 'insensitive',
				}
			},
			{
				alt_title: {
					contains: data.search,
					mode: 'insensitive',
				}
			},
		]
	}

	if (data.filter as FilterItemType[]) {
		data.filter.forEach((item) => {
			if (item.gt) {
				filter[item.name] = {
					gt: item.gt
				}
			} else if (item.lt) {
				filter[item.name] = {
					lt: item.lt
				}
			} else if (item.eq) {
				filter[item.name] = {
					equals: item.eq
				}
			} else if (item.gte) {
				filter[item.name] = {
					lt: item.gte
				}
			} else if (item.lte) {
				filter[item.name] = {
					eq: item.lte
				}
			}
		})
	}

	if (data.orderBy as OrderByItemType) {
		orderBy['orderBy'] = {
			[data.orderBy.by]: data.orderBy.order
		}
	}

	try {
		const rawData = await searchBooks(search, orderBy, filter);
		const books = rawData.map(book => {
			return {
				title: book.title,
				link_title: "/" + book.link_title,
				cover: "/src/upload/covers/" + book.cover,
				book_types: book.book_types.name,
			};
		});
		return new Response(JSON.stringify(books));
	} catch (e) {
		throw error(500, 'Database Error: Search books');
	}
};