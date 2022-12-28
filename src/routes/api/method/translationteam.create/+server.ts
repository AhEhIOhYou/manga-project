import type { TranslationTeamType } from '@/lib/server/domain/entities';
import { createTranslationTeam } from '@/lib/server/infrastructure/persistence/translation_team';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, fetch }) => {
	const data = await request.json();

	if (!data.tname)
		throw error(400, 'Data not valid');

	let user;
	try {
		const res = await fetch('/api/method/user.auth');
		user = await res.json();
	} catch (e) {
		throw error(500, e.message);
	}

	const NewTranslationTeam: TranslationTeamType = {
		name: data.tname,
		owner_id: user.id,
	}

	try {
		let rawData = await createTranslationTeam(NewTranslationTeam);
		return new Response(JSON.stringify(rawData));
	} catch (e) {
		if (e.code == 'P2002')
			throw error(400, 'Translation team already exists');
		else {
			throw error(500, 'Some error occurred');
		}
	}
};