import type { PageServerLoad } from './$types';
import type { page as PageType } from "@prisma/client";

export const load: PageServerLoad = async ({ url, fetch }) => {

	const chapterId = Number(url.pathname.substring(url.pathname.lastIndexOf('/') + 1).match(/\d+$/));
	let rawPageNumber = Number(url.searchParams.get('page'));
	const pageNumber = rawPageNumber == 0 ? null : rawPageNumber;

	let pages: Array<PageType> = [];

	const pageNumberQueryParam: string = pageNumber == null ? '' : `&page_number=${pageNumber}`;
	const api: string = `/api/method/page.get?chapter_id=${chapterId}${pageNumberQueryParam}`;
	console.log(api);
	
	const res: Response = await fetch(api);
	const data: any = await res.json();

	if (res.ok) {
		pages = data;
	} else {
		throw new Error(data.message);
	}

	return {
		pages: pages,
		pageBackUrl: "",
		pageNextUrl: "",
	};
};
