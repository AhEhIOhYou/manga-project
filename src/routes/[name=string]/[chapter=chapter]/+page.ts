import { dataset_dev } from 'svelte/internal';
import type { PageLoad, PageServerData } from './$types'

type OutputProps = Pick<PageServerData, 'pages'>

export const load: PageLoad<OutputProps> = async ( { data }) => {
	return {
		pages: data,
	};
};