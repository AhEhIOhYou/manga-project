import type { BookGenreType } from '@/lib/server/domain/entities';
import { addGenreToBook, checkGenreInBook, deleteGenre } from '@/lib/server/infrastructure/persistence/genre';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();

	if (!data.bookId || !data.genreId)
		throw error(400, 'Data not valid');

	const NewBookGenre: BookGenreType = {
		book_id: data.bookId,
		genre_id: data.genreId,
	};

	if (!await checkGenreInBook(NewBookGenre))
		throw error(400, 'Genre already exists in this book');

	try {
		let rawData = await addGenreToBook(NewBookGenre);
		return new Response(JSON.stringify(rawData));
	} catch (e) {
		throw error(500, 'Some error occurred');
	}
};

export const DELETE: RequestHandler = async ({ request }) => {
	const data = await request.json();

	if (!data.deletedId)
		throw error(400, 'Data not valid');

	try {
		let rawData = await daeleteGenre(data.deletedId);
		return new Response(JSON.stringify(rawData));
	}
	catch (e) {
		throw error(500, 'Some error occurred');
	}
};