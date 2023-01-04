import type { GenreType, BookGenreType } from "../../domain/entities";
import prisma from "@/lib/prisma";

export async function createGenre(newGenre: GenreType) {
	const genre = await prisma.genre.create({
		data: {
			name: newGenre.name,
		}
	});
	return genre;
}

export async function getAllGenres() {
	const genres = await prisma.genre.findMany({
		orderBy: {
			name: 'asc',
		}
	});
	return genres;
}

export async function findByCharesGenre(characters: string) {
	const genre = await prisma.genre.findMany({
		where: {
			name: {
				contains: characters,
			}
		},
	});
	return genre;
}

export async function deleteGenre(genreId: number) {
	const genre = await prisma.genre.delete({
		where: {
			id: genreId,
		}
	});
	return genre;
}

export async function addGenreToBook(NewBookGenre: BookGenreType) {
	const bookGenre = await prisma.book_genres.create({
		data: {
			book_id: NewBookGenre.book_id,
			genre_id: NewBookGenre.genre_id,
		}
	});
	return bookGenre;
}

export async function removeGenreFromBook(deletedId: number) {
	const bookGenre = await prisma.book_genres.delete({
		where: {
			id: deletedId,
		}
	});
	return bookGenre;
}

export async function getGenresByBookId(bookId: number) {
	const genres = await prisma.book_genres.findMany({
		where: {
			book_id: bookId,
		},
		include: {
			genre: true,
		}
	});
	return genres;
}

export async function getBooksByGenreId(genreId: number) {
	const books = await prisma.book_genres.findMany({
		where: {
			genre_id: genreId,
		},
		include: {
			book: true,
		}
	});
	return books;
}

export async function checkGenreInBook(bookGenre: BookGenreType) {
	const bookGenreCheck = await prisma.book_genres.findFirst({
		where: {
			book_id: bookGenre.book_id,
			genre_id: bookGenre.genre_id,
		}
	});
	return bookGenreCheck == null;
}