import type { BookType } from '@/lib/server/domain/entities';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ( {url} ) => {

	let bookInfo: BookType;

	const linkTitle = url.pathname.match(/\w+/)[0];
	const bookApi = url.origin + '/api/method/book.get';

	const responseBook = await fetch(bookApi, {
		method: 'POST',
		body: JSON.stringify({ linkTitle }),
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