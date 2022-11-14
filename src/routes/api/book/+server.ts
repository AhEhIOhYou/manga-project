import { getComments } from '@/lib/server/book';
import type { CommentType } from '@/lib/types';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const bookId = Number(url.searchParams.get('book_id') ?? 0);
	const parentId = Number(url.searchParams.get('parent_id') ?? 0);
	const chapterId = Number(url.searchParams.get('chapter_id') ?? null);
	const rawData = await getComments(bookId,parentId,chapterId);
	let data: Array<CommentType> = [];

	rawData.forEach((comment) => {
		data.push({
			id: comment.id,
			user: {
				id: 1,
				name: "Ayaya",
				avatar: "https://dummyimage.com/60x60/c0c0c0",
			},
			book_id: comment.book_id,
			chapter_id: comment.chapter_id,
			message: comment.message,
			root_id: comment.root_id,
			parent_id: comment.parent_id,
			like_count: comment.like_count,
			dislike_count: comment.dislike_count,
			child_count: comment.child_count,
			date: comment.created_at.toLocaleString(),
		});
	});
	return new Response(JSON.stringify(data));
};

// /** @type {import('./items').RequestHandler} */
// export const post: RequestHandler =  async ({ request }) => {

// 	return {
// 		status: 200,
// 		body: "sasd",
// 	};
// }