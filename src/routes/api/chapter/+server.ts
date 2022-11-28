import { getChapters } from '@/lib/server/chapter';
import type { ChapterType } from '@/lib/server/domain/entities';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const bookId = Number(url.searchParams.get('book_id') ?? 0);
	const rawData = await getChapters(bookId);
	let data: Array<ChapterType> = [];

	rawData.forEach((chapter) => {
		data.push({
			id: chapter.id,
			title: chapter.title,
			number: chapter.number,
			translator: chapter.translator,
			book_id: chapter.book_id,
			loader_user_id: chapter.loader_user_id,
			created_at: chapter.created_at,
		});
	});
	return new Response(JSON.stringify(data));
};