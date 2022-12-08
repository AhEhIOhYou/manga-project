import type { ChapterType } from '@/lib/server/domain/entities';
import { getChapters } from '@/lib/server/infrastructure/persistence/chapter';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const bookId = Number(url.searchParams.get('book_id'));
	if (!bookId)
		throw error(400, 'Qeury not valid');

	const chapterId = Number(url.searchParams.get('chapter_id'));

	let data: Array<ChapterType> = [];

	if (!chapterId) {
		const rawData = await getChapters(bookId);
		if (!rawData)
			throw error(500, 'Database error');
		
		rawData.forEach((chapter) => {
			data.push({
				id: chapter.id,
				title: chapter.title,
				volume: chapter.volume,
				number: chapter.number,
				translator: chapter.translator,
				book_id: chapter.book_id,
				loader_user_id: chapter.loader_user_id,
				created_at: new Date(chapter.created_at).toISOString(),
			});
		});
	}
	
	return new Response(JSON.stringify(data));
};