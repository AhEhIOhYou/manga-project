import prisma from "@/lib/prisma";
import type { TranslationTeamType } from "../../domain/entities";

export async function createTranslationTeam(newTranslationTeam: TranslationTeamType) {
	const translationTeam = await prisma.translation_team.create({
		data: {
			name: newTranslationTeam.name,
			owner: newTranslationTeam.owner_id,
		}
	});
	await addUserToTranslationTeam(translationTeam.id, newTranslationTeam.owner_id);

	return translationTeam;
}

export async function findByCharesTrTeam(characters: string) {
	const translationTeam = await prisma.translation_team.findMany({
		where: {
			name: {
				contains: characters,
			}
		},
	});
	return translationTeam;
}

export async function deleteTranslationTeam(teamId:number) {
	const translationTeam = await prisma.translation_team.delete({
		where: {
			id: teamId,
		}
	});
	return translationTeam;
}

export async function addUserToTranslationTeam(teamId:number, userId:string) {
	const translationTeam = await prisma.user_teams.create({
		data: {
			id_user: userId,
			id_translation_team: teamId,
		}
	});
	return translationTeam;
}

export async function removeUserFromTranslationTeam(teamId:number, userId:string) {
	const translationTeam = await prisma.user_teams.delete({
		where: {
			id_user: userId,
			id_translation_team: teamId,
		}
	});
	return translationTeam;
}

export async function getTeamMembers(teamId:number) {
	const translationTeam = await prisma.user_teams.findMany({
		where: {
			id_translation_team: teamId,
		},
		select: {
			id_user: true,
			users: {
				select: {
					username: true,
				}
			}
		}
	});

	return translationTeam;
}