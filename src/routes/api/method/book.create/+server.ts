import type { BookType } from '@/lib/server/domain/entities';
import { createBook } from '@/lib/server/infrastructure/persistence/book';
import { getUserByLogin } from '@/lib/server/infrastructure/persistence/user';
import { createLinkTitle } from '@/lib/utils';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
	const data = (await request.json());
	
	if (!data.title || !data.author || !data.type || !data.cover)
		throw error(400, 'Data not valid');

	if (!locals.user)
		throw error(401, 'User unauthorized');

	let user = await getUserByLogin("", locals.user.name);

	const newBook: BookType = {
		title: data.title,
		alt_title: data.altTitle,
		author: data.author,
		type: data.type,
		release_date: new Date(data.release).toISOString(),
		loader_user_id: user.user_id,
		link_title: createLinkTitle(data.title),
		description: data.description,
		cover: data.cover,
		created_at: new Date().toISOString(),
	};

	let rawData = await createBook(newBook);
	if (!rawData) {
		throw error(500, 'Database error');
	}

	return new Response(JSON.stringify(rawData));
};