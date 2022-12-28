import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies, locals }) => {
	await cookies.delete('token', { path: "/"});
	await cookies.delete('refresh_token', { path: "/"});
	locals.user = null;
	return new Response();
};