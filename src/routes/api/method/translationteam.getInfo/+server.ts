import { getTeamMembers } from '@/lib/server/infrastructure/persistence/translation_team';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	if (!data.teamId)
		throw error(400, 'Team ID is required');
	try {
		let rawData = await getTeamMembers(data.teamId);
		return new Response(JSON.stringify({ members: rawData, description: "textetxtetxtx" }));
	} catch (e) {
		throw error(500, 'Some error occurred');
	}
};