import prisma from "../prisma";

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
