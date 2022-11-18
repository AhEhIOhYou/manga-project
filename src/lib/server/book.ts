import prisma from '../prisma';

export async function getBook(bookId:number) {
	const book = prisma.book.findFirst({
		where: {
			id: bookId,
		}
	});
	return book;
}
