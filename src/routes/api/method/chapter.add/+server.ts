import type { ChapterType } from '@/lib/server/domain/entities';
import { addChapter, checkUniqueChapter, getLastChapter } from '@/lib/server/infrastructure/persistence/chapter';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, fetch }) => {
	const data = await request.json();
	if (!data.title || !data.number || !data.translator || !data.bookId)
		throw error(400, 'Data not valid');

	if (!await checkUniqueChapter(data.bookId, Number(data.volume), Number(data.number)))
		throw error(400, 'Chapter already exists');

	let user;
	try {
		const res = await fetch('/api/method/user.auth');
		user = await res.json();
	} catch (e) {
		throw error(500, e.message);
	}

	const lastChapter = await getLastChapter(data.bookId);
	const lastChapterNumber = lastChapter?.global_number ?? 0;

	const newChapter: ChapterType = {
		title: data.title,
		number: Number(data.number),
		volume: Number(data.volume),
		translator: data.translator.id,
		book_id: Number(data.bookId),
		loader_user_id: user.id,
		created_at: new Date().toISOString(),
		global_number: lastChapterNumber + 1,
	};

	try {
		const rawData = await addChapter(newChapter);
		return new Response(JSON.stringify(rawData));
	} catch (e) {
		throw error(500, 'Database Error: Add chapter data');
	}
};