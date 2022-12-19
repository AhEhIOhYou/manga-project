import prisma from "@/lib/prisma";
import type { TranslationTeamType } from "../../domain/entities";

export async function createTTeam(newTranslator: TranslationTeamType) {
	const translator = await prisma.translation_team.create({
		data: {
			name: newTranslator.name,
			
		}
	});
	return translator;
}

export async function deleteTTeam(teamId:number) {
	const translator = await prisma.translation_team.delete({
		where: {
			id: teamId,
		}
	});
	return translator;
}

export async function addUserToTTeam(teamId:number, userId:string) {
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
