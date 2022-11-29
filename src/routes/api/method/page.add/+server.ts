import { addPage } from '@/lib/server/infrastructure/persistence/page';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({request}) => {
	const data = await request.json();
	data.forEach(newPgae => {
		addPage(newPgae);
	});

	return new Response();
};