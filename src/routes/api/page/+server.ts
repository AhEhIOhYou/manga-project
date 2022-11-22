import { getPage, getPages } from '@/lib/server/page';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const chapterId = Number(url.searchParams.get('chapter_id'));
	const pageNumber = Number(url.searchParams.get('page_number'));
	let rawData = [];
	if (pageNumber == 0) {
		rawData = await getPages(chapterId);
	} else {
		rawData[0] = await getPage(chapterId, pageNumber);
	}
	
	return new Response(JSON.stringify(rawData));
};