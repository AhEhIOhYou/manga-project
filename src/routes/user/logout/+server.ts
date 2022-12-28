import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch }) => {
	const res = await fetch('/api/method/user.logout');
	if (res.ok) {
		throw redirect(307, '/');
	} else {
		throw error(500, 'Something went wrong');
	}
};
