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
	const chapters = await prisma.chapter.findMany({
		where: {
			book_id: bookId
		},
		orderBy: [
			{
				volume: 'asc',
			},
			{
				number: 'asc'
			}
		]
	});
	return chapters
}

export async function checkUniqueChapter(bookId: number, volume: number, number: number) {
	const res = await prisma.chapter.findFirst({
		where: {
			book_id: bookId,
			volume: volume,
			number: number
		}
	});
	return res == null;
}