import type { ChapterType } from '@/lib/server/domain/entities';
import { addChapter } from '@/lib/server/infrastructure/persistence/chapter';
import { getUserByLogin } from '@/lib/server/infrastructure/persistence/user';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
	const data = await request.json();
	if (!data.title || !data.number || !data.translator || !data.bookId)
		throw error(400, 'Data not valid');

	if (!locals.user)
		throw error(401, 'User unauthorized');

	const user = await getUserByLogin("", locals.user.name);

	const newChapter: ChapterType = {
		title: data.title,
		number: Number(data.number),
		volume: Number(data.volume),
		translator: data.translator,
		book_id: Number(data.bookId),
		loader_user_id: user.user_id,
		created_at: new Date().toISOString(),
	}

	const rawData = await addChapter(newChapter);
	if (!rawData)
		throw error(500, 'Database error');

	return new Response(JSON.stringify(rawData));
};