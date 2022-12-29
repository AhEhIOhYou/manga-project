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
			created_at: newChapter.created_at,
			loader_user_id: newChapter.loader_user_id,
			global_number: newChapter.global_number
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

export async function getChapterId(bookId: number, volume: number, number: number) {
	const res = await prisma.chapter.findFirst({
		where: {
			book_id: bookId,
			volume: volume,
			number: number
		},
		select: {
			id: true
		}
	});
	return res?.id;
}

export async function getChapter(bookId: number, volume: number, number: number) {
	const res = await prisma.chapter.findFirst({
		where: {
			book_id: bookId,
			volume: volume,
			number: number
		}
	});
	return res;
}

export async function getLastChapter(bookId: number) {
	const res = await prisma.chapter.findFirst({
		where: {
			book_id: bookId
		},
		orderBy: [
			{
				volume: 'desc',
			},
			{
				number: 'desc'
			}
		]
	});
	return res;
}


export async function getNavInfo(bookId: number, globalNumber: number) {
	const dataPrev = await prisma.chapter.findFirst({
		select: {
			id: true,
			volume: true,
			number: true
		},
		where: {
			book_id: bookId,
			global_number: {
				lt: globalNumber
			}
		},
		orderBy: {
			global_number: 'desc'
		}
	});

	const dataNext = await prisma.chapter.findFirst({
		select: {
			id: true,
			volume: true,
			number: true
		},
		where: {
			book_id: bookId,
			global_number: {
				gt: globalNumber
			}
		},
		orderBy: {
			global_number: 'desc'
		}
	});

	const dataMaxMin = await prisma.chapter.aggregate({
		where: {
			book_id: bookId
		},
		_max: {
			id: true,
			volume: true,
			number: true
		},
		_min: {
			id: true,
			volume: true,
			number: true
		}
	});

	return { max: dataMaxMin._max, min: dataMaxMin._min, prev: dataPrev, next: dataNext };
}