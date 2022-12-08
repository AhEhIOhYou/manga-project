import type { BookType } from '@/lib/server/domain/entities';
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async ( {url, fetch} ) => {
	
	let bookInfo: BookType;
	const linkTitle = url.pathname.replace(/\//g, '');
	const response = await fetch('/api/method/book.get', {
		method: 'POST',
		body: JSON.stringify( {linkTitle} ),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const body = await response.json();

	if (response.ok) {
		bookInfo = body;
	} else {
		throw new Error(body.message);
	}

	return { bookInfo };
};
