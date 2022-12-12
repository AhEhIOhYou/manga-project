import type { BookType } from '@/lib/server/domain/entities';
import { createBook, getBookByLinkTitle } from '@/lib/server/infrastructure/persistence/book';
import { getUserByLogin } from '@/lib/server/infrastructure/persistence/user';
import { createLinkTitle } from '@/lib/utils';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
	const data = await request.json();

	if (!data.title || !data.author || !data.type || !data.cover)
		throw error(400, 'Data not valid');

	if (!locals.user)
		throw error(401, 'User unauthorized');

	try {
		const user = await getUserByLogin("", locals.user.name);

		const title = data.title.replace(/[^a-z\s]/gi, "");

		try {
			const existingBook = await getBookByLinkTitle(createLinkTitle(title));
			if (existingBook)
				throw error(400, 'Book already exsist');
		} catch (e) {
			throw error(500, 'Database Error: Book title');
		}

		const newBook: BookType = {
			title: title,
			alt_title: data.altTitle,
			author: data.author,
			type: data.type,
			release_year: Number(data.release),
			loader_user_id: user.user_id,
			link_title: createLinkTitle(title),
			description: data.description,
			cover: data.cover,
			created_at: new Date().toISOString(),
		};

		try {
			let rawData = await createBook(newBook);
			return new Response(JSON.stringify(rawData));
		} catch (e) {
			throw error(500, 'Database Error: Add book data');
		}
	} catch (e) {
		throw error(500, 'Database Error: User not found');
	}
};