<script lang="ts">
	import type { PageData } from '../api/test2/$types';
	import Comments from '@/lib/components/Comment/Comments.svelte';
	import { DateTimeFormatter } from '@/lib/util_classes/DateTimeFormatter';

	export let data: PageData;
	const user = { username: 'Dima', id: 123123 };
	let comments = [
		{
			id: 1,
			userName: 'Igor',
			message:
				'text-1text-1text-1text-1text-1text-1text-1text-1text-1text-1text-1text-1text-1text-1text-1text-1text-1text-1text-1text-1text-1text-1text-1text-1text-1text-1',
			createdAt: DateTimeFormatter.Since('12.12.2012')
		},
		{
			id: 2,
			userName: 'Igor',
			message: 'text-2',
			createdAt: DateTimeFormatter.Since('12.12.2012')
		},
		{
			id: 3,
			userName: 'Igor',
			message: 'text-3',
			createdAt: DateTimeFormatter.Since('12.12.2012')
		},
		{
			id: 32,
			userName: 'Igor-2',
			message: 'text-32',
			createdAt: DateTimeFormatter.Since('12.12.2012')
		},
		{
			id: 33,
			userName: 'Igor-2',
			message: 'text-32',
			createdAt: DateTimeFormatter.Since('12.12.2012')
		},
		{
			id: 34,
			userName: 'Igor-2',
			message: 'text-32',
			createdAt: DateTimeFormatter.Since('12.12.2012')
		},
		{
			id: 35,
			userName: 'Igor-2',
			message: 'text-32',
			createdAt: DateTimeFormatter.Since('12.12.2012')
		},
		{
			id: 36,
			userName: 'Igor-2',
			message: 'text-32',
			createdAt: DateTimeFormatter.Since('17.12.2022')
		}
	];
	async function handleSubmit({ detail: { message } }) {
		comments[comments.length] = ({
			id: comments.length + 1,
			userName: user.username,
			message,
			createdAt: DateTimeFormatter.Since(Date.now().toLocaleString),
		});
	}

	$: console.log(comments);
	
</script>

<div class="container">
	<div class="title">Test 2</div>
	<Comments commentData={comments} on:new-comment={handleSubmit} {user} />
</div>
