export const clipText = (text: string, maxlength: number = 45): string =>
	text.length > maxlength ? text.slice(0, maxlength) + '...' : text;
export const detectMobile = (userAgent: string): boolean => {
	const toMatch = [
		/Android/i,
		/webOS/i,
		/iPhone/i,
		/iPad/i,
		/iPod/i,
		/BlackBerry/i,
		/Windows Phone/i
	];

	return toMatch.some((toMatchItem) => {
		return userAgent.match(toMatchItem);
	});
};
