import type { ChapterType } from "../../domain/entities";
import prisma from "@/lib/prisma";

export async function addChapter(newChapter: ChapterType) {
	const chapter = await prisma.chapter.create({
		data: {
			title: newChapter.title,
			volume: newChapter.volume,
			number: newChapter.number,
			translator: newChapter.translator,
			book_id: newChapter.book_id,
			loader_user_id: newChapter.loader_user_id,
			created_at: newChapter.created_at,
			page_count: newChapter.page_count,
		}
	});
	return chapter;
}

export async function getChapters(bookId: number) {
	const chapters = prisma.chapter.findMany({
		where: {
			book_id: bookId
		},
		orderBy: {
			number: 'asc'
		}
	});
	return chapters
}