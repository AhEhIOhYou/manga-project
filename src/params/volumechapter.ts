import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param) => {
	return /^v\d+(-\d+)*c\d+(-\d+)*$/.test(param);
};
