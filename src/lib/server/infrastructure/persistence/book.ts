import { Prisma } from '@prisma/client';
import prisma from '../../../prisma';
import type { BookType, OrderByItemType } from '../../domain/entities';

export async function createBook(newBook: BookType) {
	const book = await prisma.book.create({
		data: {
			title: newBook.title,
			alt_title: newBook.alt_title,
			link_title: newBook.link_title,
			author: newBook.author_id,
			type: newBook.type_id,
			description: newBook.description,
			cover: newBook.cover,
			release_year: newBook.release_year,
			created_at: newBook.created_at,
			loader_user_id: newBook.loader_user_id,
		}
	});
	return book;
}

export async function getBookById(bookId: number) {
	const book = await prisma.book.findFirst({
		where: {
			id: bookId,
		},
		select: {
			id: true,
			title: true,
			alt_title: true,
			link_title: true,
			author_book_authorToauthor: {
				select: {
					id: true,
					name: true,
				}
			},
			book_types: {
				select: {
					name: true,
				}
			},
			description: true,
			cover: true,
			release_year: true,
			created_at: true,
			users: {
				select: {
					user_id: true,
					username: true,
				}
			}
		}
	});
	return book;
}

export async function getBookByLinkTitle(linkTitle: string) {
	const book = await prisma.book.findFirst({
		where: {
			link_title: linkTitle,
		},
		select: {
			id: true,
			title: true,
			alt_title: true,
			link_title: true,
			author_book_authorToauthor: {
				select: {
					id: true,
					name: true,
				}
			},
			book_types: {
				select: {
					name: true,
				}
			},
			description: true,
			cover: true,
			release_year: true,
			created_at: true,
			users: {
				select: {
					user_id: true,
					username: true,
				}
			}
		}
	});
	return book;
}

export async function getBooks(offset: number = 0, take: number = 10) {
	const books = await prisma.book.findMany({
		select: {
			title: true,
			link_title: true,
			cover: true,
			book_types: {
				select: {
					name: true,
				}
			}
		},
		skip: offset,
		take: take,
	});
	return books;
}

export async function searchBooks(search: object, orderBy: object = null, filter: object = null, offset: number = 0, take: number = 20) {
	const books = await prisma.book.findMany({
		where: {
			...search,
			...filter,
		},
		...orderBy,
		select: {
			title: true,
			link_title: true,
			cover: true,
			book_types: {
				select: {
					name: true,
				}
			}
		},
		skip: offset,
		take: take,
	});
	return books;
}