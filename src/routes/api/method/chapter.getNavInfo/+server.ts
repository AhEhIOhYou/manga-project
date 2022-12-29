import { getNavInfo } from '@/lib/server/infrastructure/persistence/chapter';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();

	if (!data.bookId || !data.chaptedId)
		throw error(400, 'Data not valid');

	const rawData = await getNavInfo(data.bookId, data.chaptedId);

	if (!rawData)
		throw error(404, 'Not found');

	const navInfo = {
		bookId: data.bookId,
		chapterId: data.chapterId,
		max: rawData.max,
		min: rawData.min,
		next: rawData.next,
		prev: rawData.prev,
	};

	return new Response(JSON.stringify(navInfo));
};