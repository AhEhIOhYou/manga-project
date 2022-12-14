import type { PublicUserType, UserType } from '@/lib/server/domain/entities';
import { getUserByLogin } from '@/lib/server/infrastructure/persistence/user';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { VITE_JWT_KEY } from '$env/static/private';

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export const POST: RequestHandler = async ({ cookies, request }) => {
	const data = (await request.json());

	if (!data.login || !data.password)
		throw error(400, 'Data not valid');

	const userData: UserType = await getUserByLogin(data.login, data.login);
	if (!userData) {
		throw error(400, 'User not found');
	};

	const authenticated = await bcrypt.compare(data.password, userData.password);
	if (!authenticated)
		throw error(400, 'Incorrect password');

	const refresh_token = userData.refresh_token;
	
	const user: PublicUserType = {
		id: userData.user_id,
		name: userData.username,
		avatar: userData.avatar,
	};

	const key = VITE_JWT_KEY;
	const token = jwt.sign(user, key, { expiresIn: `${15 * 60 * 1000}` });

	cookies.set("token", token, { maxAge: 15 * 60, path: "/" });
	cookies.set("refresh_token", refresh_token, { maxAge: 30 * 24 * 60 * 60, path: "/" });

	return new Response(JSON.stringify(user));
};