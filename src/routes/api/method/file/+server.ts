import type { RequestHandler } from '@sveltejs/kit';
import * as fs from 'fs/promises';
import { cyrb53 } from '@/lib/utils'

export const POST: RequestHandler = async ({ request }) => {
	const data: FormData = await request.formData();
	const file: File = data.getAll('page-image')[1] as File;
	const fileHashName: string = String(cyrb53(file.name)) + "." + file.type.split('/')[1];
	const savePath: string = import.meta.env.VITE_UPLOAD_DIR + fileHashName;
	await fs.writeFile(savePath, file.stream());

	return new Response(JSON.stringify({file: fileHashName}));
};

export const DELETE: RequestHandler = async ({ request }) => {
	const data = await request.json();
	const deletePath: string = import.meta.env.VITE_UPLOAD_DIR + data.file;
	await fs.unlink(deletePath);
	return new Response(JSON.stringify({file: data.file}));
};