import prisma from "../prisma";
import type { CommentType } from "../types";

export async function getComments(bookId: number) {
	const comments = prisma.comments.findMany({
		where: {
			book_id: bookId,
		},
		orderBy: {
			created_at: "asc",
		}
	});
	return comments;
}