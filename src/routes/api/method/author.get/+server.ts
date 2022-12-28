import { findByCharesAuthor } from '@/lib/server/infrastructure/persistence/author';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ( {request} ) => {
	const data = await request.json();
	try {
		let rawData = await findByCharesAuthor(data.characters);
		
		return new Response(JSON.stringify(rawData));
	} catch (e) {
		throw error(500, 'Some error occurred');
	}
};