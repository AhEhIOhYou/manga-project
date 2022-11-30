import type { PageType, UserType } from "../../domain/entities";
import prisma from "@/lib/prisma";
import { empty } from "svelte/internal";

export async function createUser(newUser: UserType) {
	const user = await prisma.users.create({
		data: {
			email: newUser.email,
			password: newUser.password,
			username: newUser.username,
			user_id: newUser.user_id,
			refresh_token: newUser.refresh_token,
		}
	});
	return user;
}

export async function checkUserUnique(email: string, username: string) {
	const res = await prisma.users.findMany({
		where: {
			OR: [
				{
					email: email,
				},
				{
					username: username,
				}
			]
		}
	});
	return !(res.length > 0);
}

export async function getUserByLogin(email: string, username: string) {
	const user = await prisma.users.findFirst({
		where: {
			OR: [
				{
					email: email,
				},
				{
					username: username,
				}
			]
		}
	});
	return user;
}

export async function getUserByRefreshToken(refreshToken: string) {
	const user = await prisma.users.findFirst({
		where: {
			refresh_token: refreshToken
		}
	});
	return user;
}

export async function updateUserRefreshToken(oldRefreshToken, newRefreshToken: string) {
	const user = await prisma.users.update({
		where: {
			refresh_token: oldRefreshToken
		},
		data: {
			refresh_token: newRefreshToken
		}
	});
	return user;
}