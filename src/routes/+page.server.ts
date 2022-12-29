import { getBooks } from '@/lib/server/infrastructure/persistence/book';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {

	let books = [];

	try {
		const rawData = await getBooks(0, 20);
		books = rawData.map(book => {
			return {
				title: book.title,
				link_title: "/" + book.link_title,
				cover: "/src/upload/covers/" + book.cover,
				book_types: book.book_types.name,
			};
		});
	} catch (e) {
		console.error(e);
	}

	return { books };
};