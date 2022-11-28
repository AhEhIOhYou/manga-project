import type { BookType } from '@/lib/server/domain/entities';
import { createBook } from '@/lib/server/infrastructure/persistence/book';
import { createLinkTitle } from '@/lib/utils';
import type { RequestHandler } from './$types';

// test:
// http://localhost:5173/api/method/book.create?title=fufu&author=ytata%20mou&type=manga&release_date=12.12.2021
export const GET: RequestHandler = async ({ url }) => {
	const title = url.searchParams.get('title');
	const alt_title = url.searchParams.get('alt_title');
	const author = url.searchParams.get('author');
	const type = url.searchParams.get('type');
	const description = url.searchParams.get('description');
	const cover = url.searchParams.get('cover');
	const release_date = url.searchParams.get('release_date');

	const newBook: BookType = {
		title: title,
		alt_title: alt_title,
		author: author,
		type: type,
		release_date: new Date(release_date).toISOString(),
		loader_user_id: 1,
		link_title: createLinkTitle(title),
		description: description,
		cover: cover,
		created_at: new Date().toISOString(),
	};

	let rawData = await createBook(newBook);

	return new Response(JSON.stringify(rawData));
};