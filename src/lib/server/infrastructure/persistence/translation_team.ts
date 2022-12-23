import prisma from "@/lib/prisma";
import type { TranslationTeamType } from "../../domain/entities";

export async function createTranslationTeam(newTranslator: TranslationTeamType) {
	const translator = await prisma.translation_team.create({
		data: {
			name: newTranslator.name,
			owner: newTranslator.owner_id,
		}
	});
	return translator;
}

export async function deleteTranslationTeam(teamId:number) {
	const translator = await prisma.translation_team.delete({
		where: {
			id: teamId,
		}
	});
	return translator;
}

export async function addUserToTranslationTeam(teamId:number, userId:string) {
	const translator = await prisma.translation_team.update({
		where: {
			id: teamId,
		},
		data: {
			users: {
				connect: {
					id: userId,
				}
			}
		}
	});
	return translator;
}
