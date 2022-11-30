import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
	await cookies.delete('token', { path: "/"});
	await cookies.delete('refresh_token', { path: "/"});
	return new Response();
};