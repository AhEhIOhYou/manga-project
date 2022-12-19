import prisma from "@/lib/prisma";
import type { AuthorType } from "../../domain/entities";

export async function createAuthor(newAuthor: AuthorType) {
	const author = await prisma.author.create({
		data: {
			name: newAuthor.name,
		}
	});
	return author;
}

export async function deleteAuthor(id:number) {
	const author = await prisma.author.delete({
		where: {
			id: id,
		}
	});
	return author;
}

export async function findByChares(characters: string) {
	const authors = await prisma.author.findMany({
		where: {
			name: {
				contains: characters,
			}
		}
	});
	return authors;
}