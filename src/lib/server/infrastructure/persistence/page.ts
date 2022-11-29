import type { PageType } from "../../domain/entities";
import prisma from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export async function addPage(newPage: PageType) {
	const page = await prisma.page.create({
		data: {
			file_name: newPage.file_name,
			chapter_id: newPage.chapter_id,
			loader_user_id: newPage.loader_user_id,
			created_at: newPage.created_at,
			number: newPage.number
		}
	});
	return page;
}

export async function getPages(chapterId: number) {
	const pages = prisma.page.findMany({
		where: {
			chapter_id: chapterId,
		},
		orderBy: {
			number: "asc",
		}
	});
	return pages;
}

export async function getPage(chapterId: number, pageNumber: number) {
	const page = prisma.page.findFirst({
		where: {
			chapter_id: chapterId,
			number: pageNumber,
		},
	});
	return page;
}

export async function getNextPage(pageId: number) {
	const page = prisma.page.findFirst({

	});
}

export async function getChapterPageInfo(chapterId: number) {
	const data = prisma.page.aggregate({
		where: {
			chapter_id: chapterId
		},
		_max: {
			number: true,
		},
		_min: {
			number: true,
		},
	});
	return data;
}
