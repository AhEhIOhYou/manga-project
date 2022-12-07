import type { RequestHandler } from './$types';
import { VITE_JWT_KEY } from '$env/static/private';
import { error } from '@sveltejs/kit';

import type { UserType } from '@/lib/server/domain/entities';
import { checkUserUnique, createUser } from '@/lib/server/infrastructure/persistence/user';

import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import * as jwt from 'jsonwebtoken';

export const POST: RequestHandler = async ({ cookies, request }) => {
	const data = (await request.json());

	if (!data.email || !data.password || !data.username)
		throw error(400, 'Data not valid');

	const checkUnique = await checkUserUnique(data.email, data.username);
	if (!checkUnique) {
		throw error(400, 'User data not unique!');
	};

	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(data.password, salt);
	const user_id = randomUUID();
	const refresh_token = randomUUID();
	let newUser: UserType = {
		email: data.email,
		password: hash,
		username: data.username,
		user_id: user_id,
		refresh_token: refresh_token,
	};

	let res = await createUser(newUser);
	if (!res) {
		throw error(400, 'Database error');
	}

	const user = {
		username: data.username,
		user_id,
		email: data.email
	};

	const key = VITE_JWT_KEY;
	const token = jwt.sign(user, key, { expiresIn: `${15 * 60 * 1000}` });

	cookies.set("token", token, { maxAge: 15 * 60, path: "/" });
	cookies.set("refresh_token", refresh_token, { maxAge: 30 * 24 * 60 * 60, path: "/" });

	return new Response(JSON.stringify(user));
};