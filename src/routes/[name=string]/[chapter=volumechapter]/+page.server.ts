import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, fetch, params }) => {

	const bookLinkTitle = params.name;
	const volumeNumber = Number(params.chapter.match(/v\d+/)[0].substring(1));
	const chapterNumber = Number(params.chapter.match(/c\d+/)[0].substring(1));

	let rawPageNumber = Number(url.searchParams.get('page'));
	const pageNumber = rawPageNumber == 0 ? null : rawPageNumber;

	const pageNumberQueryParam: string = pageNumber == null ? '' : `&page_number=${pageNumber}`;

	const res = await fetch('/api/method/chapter.get?book_link_title=' + bookLinkTitle + '&chapter_volume=' + volumeNumber + '&chapter_number=' + chapterNumber + pageNumberQueryParam);

	const data: any = await res.json();

	if (!res.ok) {
		throw new Error(data.message);
	}

	return { readerData: data };
};
