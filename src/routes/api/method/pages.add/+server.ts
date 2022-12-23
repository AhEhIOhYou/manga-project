import type { PageType } from '@/lib/server/domain/entities';
import { addPage } from '@/lib/server/infrastructure/persistence/page';
import { getUserByLogin } from '@/lib/server/infrastructure/persistence/user';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, fetch }) => {
	const data = await request.json();

	if (!data.user_id)
		throw error(400, 'User not valid');

	for (const page of data.pages) {
		if (!page.fileName || !data.chapterId || !page.number)
			throw error(400, 'Data not valid');

		const newPage: PageType = {
			file_name: page.fileName,
			chapter_id: data.chapterId,
			loader_user_id: user.user_id,
			number: page.number,
			created_at: new Date().toISOString(),
		}
		const rawData = await addPage(newPage);
		if (!rawData)
			throw error(500, 'Database error');
	}

	return new Response();
};