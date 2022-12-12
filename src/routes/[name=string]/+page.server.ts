import type { BookType, ChapterType } from '@/lib/server/domain/entities';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async ({ url }) => {

	let bookInfo: BookType;
	let chaptersInfo: Array<ChapterType> = [];

	const linkTitle = url.pathname.replace(/\//g, '');
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

	const chaptersApi = url.origin + `/api/method/chapters.get?book_id=${bookInfo.id}`;

	const responseChapters = await fetch(chaptersApi);
	const dataChapters = await responseChapters.json();
	if (responseChapters.ok)
		chaptersInfo = dataChapters.reverse();
	else
		throw error(404, dataChapters.message);

	return { bookInfo, chaptersInfo };
};
