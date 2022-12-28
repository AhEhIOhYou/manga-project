import { getPages } from '@/lib/server/infrastructure/persistence/page';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ( {url} ) => {
	const chapterId = Number(url.searchParams.get('chapter_id'));
	if (chapterId == 0) 
		throw new Error('chapter_id is required');

	console.log(chapterId);
		

	const rawData = await getPages(chapterId);
	if (!rawData)
		throw new Error('Not found');

	const pages = rawData.map(page => {
		return {
			id: page.id,
			file_name: page.file_name,
			chapter_id: page.chapter_id,
			loader_user_id: page.loader_user_id,
			created_at: page.created_at,
			number: page.number
		}
	});
	return new Response(JSON.stringify(pages));
};