import type { comments } from '@prisma/client';
import prisma from '../prisma';

export async function getComments(bookId: number, parentId: number, chapterId: number) {
	const comments = prisma.comments.findMany({
		where: {
			book_id: bookId,
			parent_id: parentId,
			chapter_id: chapterId
		},
		orderBy: {
			created_at: 'asc'
		}
	});
	return comments;
}

export async function saveComment(newComment: comments) {
	if (newComment.parent_id != 0) {
		updateCommentChildStatus(newComment.parent_id, 'inc');
	}
	const createComment = await prisma.comments.create({
		data: newComment
	});
	return createComment;
}

export async function deleteCommentPermanently(commentId: number) {
	const result: comments = await prisma.comments.delete({
		where: {
			id: commentId
		}
	});
	return result;
}

export async function deleteCommentText(commentId: number) {
	const result: comments = await prisma.comments.update({
		where: {
			id: commentId
		},
		data: {
			message: '',
			is_deleted: true
		}
	});
	return result;
}

export async function updateCommentChildStatus(parentId: number, action: string) {
	let result: number;
	if (action === 'inc') {
		result =
			await prisma.$executeRaw`UPDATE comments SET child_count = child_count + 1 WHERE id = ${parentId}`;
	} else if (action === 'dec') {
		result =
			await prisma.$executeRaw`UPDATE comments SET child_count = child_count - 1 WHERE id = ${parentId}`;
	}
	return result;
}
