import type { Handle } from '@sveltejs/kit';

function redirect(location: string, body?: string) {
	return new Response(body, {
		status: 303,
		headers: { location }
	});
}

export const handle: Handle = async ({ event, resolve }) => {

	return resolve(event);
};