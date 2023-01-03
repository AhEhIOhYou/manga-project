import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import path from 'path';

const config: UserConfig = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			'@': path.resolve('/src')
		}
	},
	build: {
		sourcemap: true,
	}

};

export default config;
