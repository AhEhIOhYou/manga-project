import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param) => {
	return /^c\d+(-\d+)*$/.test(param);
};