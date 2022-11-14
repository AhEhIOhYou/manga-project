import type { comments } from "@prisma/client";
import prisma from "../prisma";
import type { CommentType } from "../types";

export async function getComments(bookId: number, parentId: number, chapterId: number) {
	const comments = prisma.comments.findMany({
		where: {
			book_id: bookId,
			parent_id: parentId,
			chapter_id: chapterId ?? null,
		},
		orderBy: {
			created_at: "asc",
		}
	});
	return comments;
}

export async function saveComment(newComment: comments) {
	const createComment = await prisma.comments.create({
		data: newComment,
	});
	return createComment;
}