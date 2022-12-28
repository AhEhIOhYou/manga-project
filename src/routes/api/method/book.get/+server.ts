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
		author_id: rawData.author,
		type: rawData.type,
		cover_url: "src/upload/" + fileCategory + "/" + rawData.cover,
		description: rawData.description,
		release_year: rawData.release_year,
		loader_user_id: rawData.loader_user_id,
		created_at: new Date(rawData.created_at).toISOString(),
		link_title: rawData.link_title,
	}
	return new Response(JSON.stringify(bookData));
};