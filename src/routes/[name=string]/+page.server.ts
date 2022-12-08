import type { BookType, ChapterType } from '@/lib/server/domain/entities';
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async ({ url, fetch }) => {

	let bookInfo: BookType;
	const linkTitle = url.pathname.replace(/\//g, '');
	const responseBook = await fetch('/api/method/book.get', {
		method: 'POST',
		body: JSON.stringify({ linkTitle }),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const bodyBook = await responseBook.json();

	if (responseBook.ok) {
		bookInfo = bodyBook;
	} else {
		throw new Error(bodyBook.message);
	}

	let chaptersInfo: Array<ChapterType> = [];
	const responseChapters = await fetch(`/api/method/chapters.get?book_id=${bookInfo.id}`, {
		method: 'GET'
	});
	const bodyChapters = await responseChapters.json();
	if (responseChapters.ok) {
		chaptersInfo = bodyChapters.reverse();
	} else {
		throw new Error(bodyChapters.message);
	}

	return { bookInfo, chaptersInfo };
};
