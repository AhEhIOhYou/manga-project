import type { BookType } from '@/lib/server/domain/entities';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, fetch }) => {

	let bookInfo: BookType;
	
	const responseBook = await fetch('/api/method/book.get', {
		method: 'POST',
		body: JSON.stringify({ linkTitle: params.name }),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const dataBook = await responseBook.json();
	if (responseBook.ok)
		bookInfo = dataBook;
	else
		throw error(404, dataBook.message);

	return { bookId: bookInfo.id };
};