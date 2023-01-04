import type { GenreType } from '@/lib/server/domain/entities';
import { createGenre, deleteGenre, getAllGenres } from '@/lib/server/infrastructure/persistence/genre';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	try {
		let rawData = await getAllGenres();
		return new Response(JSON.stringify(rawData));
	} catch (e) {
		throw error(500, 'Some error occurred');
	}
};

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();

	if (!data.gname)
		throw error(400, 'Data not valid');

	const NewGenre: GenreType = {
		name: data.gname,
	}

	try {
		let rawData = await createGenre(NewGenre);
		return new Response(JSON.stringify(rawData));
	} catch (e) {
		if (e.code == 'P2002')
			throw error(400, 'Genre already exists');
		else {
			throw error(500, 'Some error occurred');
		}
	}
};

export const DELETE: RequestHandler = async ({ request }) => {
	const data = await request.json();

	if (!data.genreId)
		throw error(400, 'Data not valid');

	try {
		let rawData = await deleteGenre(data.genreId);
		return new Response(JSON.stringify(rawData));
	} catch (e) {
		throw error(500, 'Some error occurred');
	}
}