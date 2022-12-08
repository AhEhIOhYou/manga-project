import type { BookType } from '@/lib/server/domain/entities';
import { getBookByTitle } from '@/lib/server/infrastructure/persistence/book';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();

	if (!data.linkTitle)
		throw error(400, 'Data not valid');

	const rawData = await getBookByTitle(data.linkTitle);
	if (!rawData)
		throw error(500, 'Database error');

	const bookData: BookType = {
		id: rawData.id,
		title: rawData.title,
		alt_title: rawData.alt_title,
		author: rawData.author,
		type: rawData.type,
		cover: rawData.cover,
		description: rawData.description,
		release_date: new Date(rawData.release_date).toISOString(),
		loader_user_id: rawData.loader_user_id,
		created_at: new Date(rawData.created_at).toISOString(),
		link_title: rawData.link_title,
	}

	return new Response(JSON.stringify(bookData));
};