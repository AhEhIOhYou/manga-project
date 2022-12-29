import type { BookType, ChapterType } from '@/lib/server/domain/entities';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async ({ fetch, url }) => {

	let bookInfo: BookType;
	let chaptersInfo: Array<ChapterType> = [];

	const linkTitle = url.pathname.replace(/\//g, '');

	const responseBook = await fetch('/api/method/book.get', {
		method: 'POST',
		body: JSON.stringify({ linkTitle }),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const dataBook = await responseBook.json();

	if (!responseBook.ok)
		throw error(404, dataBook.message);
	else
		bookInfo = dataBook;

	const responseChapters = await fetch(`/api/method/chapters.get?book_id=${bookInfo.id}`);
	const dataChapters = await responseChapters.json();

	if (!responseChapters.ok)
		throw error(404, dataChapters.message);
	else
		chaptersInfo = dataChapters.reverse();

	return { bookInfo, chaptersInfo };
};
