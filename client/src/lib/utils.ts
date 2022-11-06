export const clipText = (text: string, maxlength: number = 45): string =>
	text.length > maxlength ? text.slice(0, maxlength) + '...' : text;
