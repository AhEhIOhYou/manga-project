import { addChapter } from '@/lib/server/infrastructure/persistence/chapter';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({request}) => {
	const data = await request.json();
	addChapter(data);
	return new Response();
};