import type { BookType } from '@/lib/server/domain/entities';
import { createBook, getBookByLinkTitle } from '@/lib/server/infrastructure/persistence/book';
import { getUserByLogin } from '@/lib/server/infrastructure/persistence/user';
import { createLinkTitle } from '@/lib/utils';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, fetch }) => {
	const data = await request.json();

	if (!data.title || !data.author_id || !data.type || !data.cover)
		throw error(400, 'Data not valid');

	let user;
	try {
		const res = await fetch('/api/method/user.auth');
		user = await res.json();
	} catch (e) {
		throw error(500, e.message);
	}

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
		author_id: Number(data.author_id),
		type_id: Number(data.type),
		release_year: Number(data.release),
		loader_user_id: user.id,
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
};