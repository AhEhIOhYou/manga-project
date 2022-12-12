import { error, type RequestHandler } from '@sveltejs/kit';
import * as fs from 'fs/promises';
import { cyrb53 } from '@/lib/utils'

export const POST: RequestHandler = async ({ request }) => {
	const data: FormData = await request.formData();
	const file: File = data.get('file') as File;
	const category = data.get('category');
	const fileHashName: string = String(cyrb53(file.name)) + "." + file.type.split('/')[1];
	const savePath: string = import.meta.env.VITE_UPLOAD_DIR + category + "/" + fileHashName;
	try {
		await fs.writeFile(savePath, file.stream());
		return new Response(JSON.stringify({ file: fileHashName }));
	} catch (e) {
		throw error(500, 'File Storage Error: File recording')
	}
};

export const DELETE: RequestHandler = async ({ request }) => {
	const data = await request.json();
	const category: string = data.category;
	let deletePath: string = import.meta.env.VITE_UPLOAD_DIR + category + "/" + data.file;
	console.log(deletePath);
	
	try {
		await fs.unlink(deletePath);
		return new Response(JSON.stringify({ file: data.file }));
	} catch (e) {
		throw error(500, 'File Storage Error: File reading')
	}
};