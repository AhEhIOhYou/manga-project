import prisma from '../../../prisma';
import type { BookType } from '../../domain/entities';

export async function createBook(newBook:BookType) {
	const book = prisma.book.create({
		data: {
			title: newBook.title,
			alt_title: newBook.alt_title,
			link_title: newBook.link_title,
			author: newBook.author,
			type: newBook.type,
			description: newBook.description,
			cover: newBook.cover,
			release_date: newBook.release_date,
			created_at: newBook.created_at,
			loader_user_id: newBook.loader_user_id,
		}
	});
	return book;
}

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
