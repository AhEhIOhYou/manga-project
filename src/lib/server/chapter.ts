import prisma from "../prisma";

export async function getChapters(bookId:number) {
	const chapters = prisma.chapter.findMany({
		where: {
			book_id: bookId
		}
	});
	return chapters
}