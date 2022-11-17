import { deleteCommentText, getComments, saveComment } from '@/lib/server/comment';
import type { CommentType } from '@/lib/types';
import type { comments } from '@prisma/client';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const bookId = Number(url.searchParams.get('book_id') ?? 0);
	const parentId = Number(url.searchParams.get('parent_id') ?? 0);
	const chapterId = Number(url.searchParams.get('chapter_id'));
	const rawData = await getComments(bookId, parentId, chapterId == 0 ? null : chapterId);
	let data: Array<CommentType> = [];

	rawData.forEach((comment) => {
		data.push({
			id: comment.id,
			user: {
				id: 1,
				name: 'Ayaya',
				avatar: 'https://dummyimage.com/60x60/c0c0c0'
			},
			book_id: comment.book_id,
			chapter_id: comment.chapter_id,
			message: comment.message,
			root_id: comment.root_id,
			parent_id: comment.parent_id,
			like_count: comment.like_count,
			dislike_count: comment.dislike_count,
			child_count: comment.child_count,
			created_at: comment.created_at,
			is_deleted: comment.is_deleted
		});
	});
	return new Response(JSON.stringify(data));
};

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	const newComment: comments = {
		author: 1,
		book_id: data.book_id,
		chapter_id: data.chapter_id,
		message: data.message,
		root_id: data.root_id,
		parent_id: data.parent_id,
		like_count: 0,
		dislike_count: 0,
		child_count: 0,
		created_at: new Date()
	};
	const rawCretedComment: comments = await saveComment(newComment);
	const createdComment: CommentType = {
		id: rawCretedComment.id,
		user: {
			id: rawCretedComment.author,
			name: 'Ayaya',
			avatar: 'http://dummyimage.com/60x60/c0c0c0'
		},
		book_id: rawCretedComment.book_id,
		chapter_id: rawCretedComment.chapter_id,
		message: rawCretedComment.message,
		root_id: rawCretedComment.root_id,
		parent_id: rawCretedComment.parent_id,
		like_count: rawCretedComment.like_count,
		dislike_count: rawCretedComment.dislike_count,
		child_count: rawCretedComment.child_count,
		created_at: rawCretedComment.created_at,
		is_deleted: rawCretedComment.is_deleted
	};

	return new Response(JSON.stringify(createdComment));
};

export const DELETE: RequestHandler = async ({ url }) => {
	const commentId = Number(url.searchParams.get('comment_id') ?? 0);

	const rawDeletedComment: comments = await deleteCommentText(commentId);
	const deletedComment: CommentType = {
		id: rawDeletedComment.id,
		user: {
			id: rawDeletedComment.author,
			name: 'Ayaya',
			avatar: 'http://dummyimage.com/60x60/c0c0c0'
		},
		book_id: rawDeletedComment.book_id,
		chapter_id: rawDeletedComment.chapter_id,
		message: rawDeletedComment.message,
		root_id: rawDeletedComment.root_id,
		parent_id: rawDeletedComment.parent_id,
		like_count: rawDeletedComment.like_count,
		dislike_count: rawDeletedComment.dislike_count,
		child_count: rawDeletedComment.child_count,
		created_at: rawDeletedComment.created_at,
		is_deleted: rawDeletedComment.is_deleted
	};

	return new Response(JSON.stringify(deletedComment));
};
