import { createCanvas, Image } from "canvas";

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
export const createLinkTitle = (text: string): string => text.replace(/ /g, '-').toLowerCase();
export function getBase64(image) {
	const reader = new FileReader();
	reader.readAsDataURL(image);
	reader.onload = (e) => {
		return e.target.result;
	};
}

function getRadianAngle(degreeValue) {
	return (degreeValue * Math.PI) / 180
}
/*
export async function getCroppedImg(imageSrc, pixelCrop, rotation = 0) {
	const image = await createImage(imageSrc);
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');

	const maxSize = Math.max(image.width, image.height);
	const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

	// set each dimensions to double largest dimension to allow for a safe area for the
	// image to rotate in without being clipped by canvas context
	canvas.width = safeArea;
	canvas.height = safeArea;

	// translate canvas context to a central location on image to allow rotating around the center.
	ctx.translate(safeArea / 2, safeArea / 2);
	ctx.rotate(getRadianAngle(rotation));
	ctx.translate(-safeArea / 2, -safeArea / 2);

	// draw rotated image and store data.
	ctx.drawImage(
		image,
		safeArea / 2 - image.width * 0.5,
		safeArea / 2 - image.height * 0.5
	)
	const data = ctx.getImageData(0, 0, safeArea, safeArea)

	// set canvas width to final desired crop size - this will clear existing context
	canvas.width = pixelCrop.width
	canvas.height = pixelCrop.height

	// paste generated rotate image with correct offsets for x,y crop values.
	ctx.putImageData(
		data,
		Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
		Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
	)

	return canvas.toDataURL('image/jpeg');
}
*/

/*
	cyrb53 (c) 2018 bryc (github.com/bryc)
	A fast and simple hash function with decent collision resistance.
	Largely inspired by MurmurHash2/3, but with a focus on speed/simplicity.
	Public domain. Attribution appreciated.
*/
export const cyrb53 = function (str, seed = 0) {
	let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
	for (let i = 0, ch; i < str.length; i++) {
		ch = str.charCodeAt(i);
		h1 = Math.imul(h1 ^ ch, 2654435761);
		h2 = Math.imul(h2 ^ ch, 1597334677);
	}
	h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
	h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
	return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

//Saves file to server
export async function saveFile(file: Blob, category: string = ''): Promise<string> {
	let form: FormData = new FormData();
	form.append('file', file, file.name);
	form.append('category', category);
	const response = await fetch('/api/method/file', {
		method: 'POST',
		body: form
	});
	const body = await response.json();
	if (response.ok) {
		return body.file;
	} else {
		throw body.message;
	}
}

//Deletes file from server
export async function deleteFile(name: string, category: string = ''): Promise<string> {
	const response = await fetch('/api/method/file', {
		method: 'DELETE',
		body: JSON.stringify({ file: name, category: category }),
	});
	const body = await response.json();
	if (response.ok) {
		return body.file;
	} else {
		throw body.message;
	}
}

const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
	const hex = x.toString(16)
	return hex.length === 1 ? '0' + hex : hex
}).join('')

export async function getAverageRGB(imgSrc: string): Promise<string> {

	let image = new Image();
	image.src = imgSrc;

	let blockSize = 5,
		defaultHEX = '#000000',
		data,
		width = image.width,
		height = image.height,
		i = -4,
		length,
		rgb = { r: 0, g: 0, b: 0 },
		count = 0;

	const canvas = createCanvas(width, height);
	const context = canvas.getContext("2d");

	if (!context) {
		return defaultHEX;
	}

	context.drawImage(image, 0, 0, width, height);

	height = canvas.height = image.height;
	width = canvas.width = image.width;

	context.drawImage(image, 0, 0);

	try {
		data = context.getImageData(0, 0, width, height);
	} catch (e) {
		return defaultHEX;
	}

	length = data.data.length;

	while ((i += blockSize * 4) < length) {
		++count;
		rgb.r += data.data[i];
		rgb.g += data.data[i + 1];
		rgb.b += data.data[i + 2];
	}

	rgb.r = ~~(rgb.r / count);
	rgb.g = ~~(rgb.g / count);
	rgb.b = ~~(rgb.b / count);

	return rgbToHex(rgb.r, rgb.g, rgb.b);
}