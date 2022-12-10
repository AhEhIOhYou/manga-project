import type { PageType } from '@/lib/server/domain/entities';
import { addPage } from '@/lib/server/infrastructure/persistence/page';
import { getUserByLogin } from '@/lib/server/infrastructure/persistence/user';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({request, locals}) => {
	const data = await request.json();
	if (!data.fileName || !data.chapterId || !data.number)
		throw error(400, 'Data not valid');
	
	if (!locals.user)
		throw error(401, 'User unauthorized');
	
	let user = await getUserByLogin("", locals.user.name);

	const newPage: PageType = {
		file_name: data.fileName,
		chapter_id: data.chapterId,
		loader_user_id: user.user_id,
		number: data.number,
		created_at: new Date().toISOString(),
	}

	const rawData = await addPage(newPage);

	return new Response(JSON.stringify(rawData));
};