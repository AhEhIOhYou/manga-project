import { getAllGenres } from '@/lib/server/infrastructure/persistence/genre';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {

	// const genres = await getAllGenres();

	const genres = [
		{
			id: 1,
			name: 'action',
			book_count: 10,
		},
		{
			id: 2,
			name: 'adventure',
			book_count: 10,
		},
		{
			id: 3,
			name: 'comedy',
			book_count: 10,
		},
		{
			id: 4,
			name: 'adventure',
			book_count: 10,
		},
		{
			id: 5,
			name: 'comedy',
			book_count: 10,
		},
		{
			id: 6,
			name: 'adventure',
			book_count: 10,
		},
		{
			id: 7,
			name: 'comedy',
			book_count: 10,
		},
		{
			id: 8,
			name: 'adventure',
			book_count: 10,
		},
		{
			id: 9,
			name: 'testsetesttestte',
			book_count: 10,
		},
		{
			id: 10,
			name: 'adventure',
			book_count: 10,
		},
		{
			id: 11,
			name: 'comedy',
			book_count: 10,
		},
	];

	return { genres };
};