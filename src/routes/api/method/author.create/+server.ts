import type { AuthorType } from '@/lib/server/domain/entities';
import { createAuthor } from '@/lib/server/infrastructure/persistence/author';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();

	if (!data.authorName)
		throw error(400, 'Data not valid');

	const NewAuthor: AuthorType = {
		name: data.authorName,
	}

	try {
		let rawData = await createAuthor(NewAuthor);
		return new Response(JSON.stringify(rawData));
	} catch (e) {
		if (e.code == 'P2002')
			throw error(400, 'Author already exists');
		else {
			throw error(500, 'Some error occurred');
		}
	}
};