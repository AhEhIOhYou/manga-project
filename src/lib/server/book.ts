import prisma from '../prisma';

export async function getBookById(bookId:number) {
	const book = prisma.book.findFirst({
		where: {
			id: bookId,
		}
	});
	return book;
}

export async function getBookByTitle(title:string) {
	const book = prisma.book.findFirst({
		where: {
			link_title: title,
		}
	});
	return book;
}
