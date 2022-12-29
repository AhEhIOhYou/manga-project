import type { BookType } from '@/lib/server/domain/entities';
import { getBookByLinkTitle } from '@/lib/server/infrastructure/persistence/book';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();

	if (!data.linkTitle)
		throw error(400, 'Data not valid');

	const rawData = await getBookByLinkTitle(data.linkTitle);
	if (!rawData)
		throw error(404, 'Not found');

	const fileCategory: string = "covers";
	const bookData: BookType = {
		id: rawData.id,
		title: rawData.title,
		alt_title: rawData.alt_title,
		link_title: rawData.link_title,
		author_id: rawData.author_book_authorToauthor.id,
		author: rawData.author_book_authorToauthor.name,
		type: rawData.book_types.name,
		cover_url: "src/upload/" + fileCategory + "/" + rawData.cover,
		description: rawData.description,
		release_year: rawData.release_year,
		loader_user_id: rawData.users.user_id,
		loader_username: rawData.users.username,
		created_at: new Date(rawData.created_at).toISOString(),
	}
	return new Response(JSON.stringify(bookData));
};