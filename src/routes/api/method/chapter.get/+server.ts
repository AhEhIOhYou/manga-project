import { getBookByLinkTitle } from '@/lib/server/infrastructure/persistence/book';
import { getChapter, getNavInfo } from '@/lib/server/infrastructure/persistence/chapter';
import { getPages } from '@/lib/server/infrastructure/persistence/page';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {

	const chapterVolume = Number(url.searchParams.get('chapter_volume'));
	const chapterNumber = Number(url.searchParams.get('chapter_number'));
	const bookLinkTitle = url.searchParams.get('book_link_title');
	if (chapterVolume == 0 || chapterNumber == 0 || bookLinkTitle == null)
		throw new Error('chapter_volume, chapter_number and book_link_title are required');

	const book = await getBookByLinkTitle(bookLinkTitle);
	if (!book)
		throw new Error('Book not found');

	const chapter = await getChapter(book.id, chapterVolume, chapterNumber);
	if (!chapter)
		throw new Error('Chapter not found');

	const navInfo = await getNavInfo(book.id, chapter.global_number);
	if (!navInfo)
		throw new Error('Nav info not found');

	const pages = await getPages(chapter.id);
	if (!pages)
		throw new Error('Pages not found');

	const fileCategory: string = "pages";
	const chapterData = {
		id: chapter.id,
		volume: chapter.volume,
		title: chapter.title,
		number: chapter.number,
		book_id: chapter.book_id,
		book_link_title: book.link_title,
		loader_user_id: chapter.loader_user_id,
		created_at: chapter.created_at,
		global_number: chapter.global_number,
		pages: pages.map(page => {
			return {
				id: page.id,
				file_name: page.file_name,
				url: "/src/upload/" + fileCategory + "/" + page.file_name,
				chapter_id: page.chapter_id,
				loader_user_id: page.loader_user_id,
				created_at: page.created_at,
				number: page.number
			}
		}),
		nav_info: {
			prev: navInfo.prev,
			next: navInfo.next,
			max: navInfo.max,
			min: navInfo.min
		}
	};

	return new Response(JSON.stringify(chapterData));
};