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
const createImage = (url) =>
	new Promise((resolve, reject) => {
		const image = new Image()
		image.addEventListener('load', () => resolve(image))
		image.addEventListener('error', (error) => reject(error))
		image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
		image.src = url
	});
function getRadianAngle(degreeValue) {
	return (degreeValue * Math.PI) / 180
}
export async function getCroppedImg(imageSrc, pixelCrop, rotation = 0) {
	const image = await createImage(imageSrc)
	const canvas = document.createElement('canvas')
	const ctx = canvas.getContext('2d')

	const maxSize = Math.max(image.width, image.height)
	const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2))

	// set each dimensions to double largest dimension to allow for a safe area for the
	// image to rotate in without being clipped by canvas context
	canvas.width = safeArea
	canvas.height = safeArea

	// translate canvas context to a central location on image to allow rotating around the center.
	ctx.translate(safeArea / 2, safeArea / 2)
	ctx.rotate(getRadianAngle(rotation))
	ctx.translate(-safeArea / 2, -safeArea / 2)

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

	// As Base64 string
	// return canvas.toDataURL('image/jpeg');

	// As a blob
	return new Promise((resolve) => {
		canvas.toBlob((file) => {
			resolve(URL.createObjectURL(file))
		}, 'image/png')
	})
}