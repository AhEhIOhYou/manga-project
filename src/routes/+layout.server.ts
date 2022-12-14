import type { LayoutServerLoad } from './$types';
import { VITE_JWT_KEY } from '$env/static/private';
import * as jwt from 'jsonwebtoken';
import { getUserByRefreshToken } from '@/lib/server/infrastructure/persistence/user';
import type { PublicUserType, UserType } from '@/lib/server/domain/entities';
import { redirect, type Cookies } from '@sveltejs/kit';

const protectedRoutes: string[] = [
	'/test2',
];

const protectedAfterLogin: string[] = [
	'/user/sign-in',
	'/user/sign-up',
]

export const load: LayoutServerLoad = async ({ locals, cookies, url }) => {
	const token = cookies.get('token');
	const refresh_token = cookies.get('refresh_token');

	let user: PublicUserType;
	if (token || refresh_token) {
		user = await AuthUser(cookies, token, refresh_token);
		if (user) {
			locals.user = {
				id: user.id,
				name: user.name,
				avatar: user.avatar,
			};
		}
	}

	if (!user && protectedRoutes.includes(url.pathname))
		throw redirect(307, '/user/sign-in');

	if (user && protectedAfterLogin.includes(url.pathname))
		throw redirect(307, '/');

	return {
		user: locals.user,
	}
};


async function AuthUser(cookies: Cookies, token: string, refresh_token: string) {
	const key = VITE_JWT_KEY;

	try {
		const userData = jwt.verify(token, key) as Record<any, any> as PublicUserType;
		return userData;
	} catch {
		if (!refresh_token)
			return null;

		const userData = await getUserByRefreshToken(refresh_token);
		if (!userData) {
			await cookies.delete('refresh_token', { path: "/" });
			return null;
		}

		const user: PublicUserType = {
			id: userData.user_id,
			name: userData.username,
			avatar: userData.avatar,
		};

		const token = jwt.sign(user, key, { expiresIn: `${15 * 60 * 1000}` });
		cookies.set("token", token, { maxAge: 15 * 60, path: "/" });
		return user;
	}
}