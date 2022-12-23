import type { RequestHandler } from './$types';
import { VITE_JWT_KEY } from '$env/static/private';
import * as jwt from 'jsonwebtoken';
import { error } from '@sveltejs/kit';
import { getUserByLogin, getUserByRefreshToken } from '@/lib/server/infrastructure/persistence/user';
import type { PublicUserType } from '@/lib/server/domain/entities';

export const GET: RequestHandler = async ({ cookies, locals }) => {
	const token = cookies.get('token');
	const refresh_token = cookies.get('refresh_token');
	const key = VITE_JWT_KEY;

	let user;

	if (locals.user) {
		try {
			user = await getUserByLogin("", locals.user.name);
			return user;
		} catch (e) {
			throw error(500, 'Database Error: User not found');
		}
	}

	try {
		const userData = jwt.verify(token, key) as Record<any, any>;

		console.log("1");
		
		console.log(userData);
		

		const user: PublicUserType = {
			id: userData.id,
			name: userData.name,
			avatar: userData.avatar,
		};

		return new Response(JSON.stringify(user));
	} catch {
		if (!refresh_token)
			throw error(401, 'Unauthorized user');

		const userData = await getUserByRefreshToken(refresh_token);
		if (!userData) {
			await cookies.delete('refresh_token', { path: "/" });
			throw error(401, 'User data error');
		}

		const user: PublicUserType = {
			id: userData.user_id,
			name: userData.username,
			avatar: userData.avatar,
		};

		const token = jwt.sign(user, key, { expiresIn: `${15 * 60 * 1000}` });
		cookies.set("token", token, { maxAge: 15 * 60, path: "/" });
		return new Response(JSON.stringify(user));
	}
};