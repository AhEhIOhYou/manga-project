import type { BookType } from '@/lib/server/domain/entities';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ( {url, fetch} ) => {
	
	let bookInfo: BookType;
	const bookName = url.pathname.replace(/\//g, '');

	const api: string = `/api/book?link_title=${bookName}`;
	const res: Response = await fetch(api);
	const data: any = await res.json();

	if (res.ok) {
		bookInfo = data;
	} else {
		throw new Error(data.message);
	}

	return { bookInfo };
};
