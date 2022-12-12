import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ( {url} ) => {
	const linkTitle = url.pathname.replace(/\//g, '');
	console.log(url.pathname);
	console.log(linkTitle);
	
	return {};
};