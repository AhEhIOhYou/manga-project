import { getBookByTitle } from '@/lib/server/book';
import type { BookType } from '@/lib/types';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const bookLibkTitle = url.searchParams.get('link_title') ?? '';
	const rawData = await getBookByTitle(bookLibkTitle);
	let data: BookType = {
		id: rawData.id,
		title: rawData.title,
		alt_title: rawData.alt_title,
		author: rawData.author,
		type: rawData.type,
		cover: rawData.cover,
		description: rawData.description,
		release_date: rawData.release_date,
		tags: rawData.tags,
		loader_user_id: rawData.loader_user_id,
		created_at: rawData.created_at,
		link_title: rawData.link_title,
	}
	return new Response(JSON.stringify(data));
};