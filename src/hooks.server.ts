import type { Handle } from '@sveltejs/kit';
import { VITE_JWT_KEY } from '$env/static/private';
import * as jwt from 'jsonwebtoken';

export const handle: Handle = async ({ event, resolve }) => {
	// const token = event.cookies.get('token');
	// if (token) {
	// 	const userData = jwt.verify(token, VITE_JWT_KEY) as Record<any, any>;
	// 	if (userData) {
	// 		event.locals.user = {
	// 			name: userData.username,
	// 		};
	// 	}
	// }
	
	return resolve(event);
};