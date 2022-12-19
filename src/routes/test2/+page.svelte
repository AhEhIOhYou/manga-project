<script lang="ts">
	import type { PageData } from '../api/test2/$types';
	import CreateComment from '@/lib/components/Comment/CreateComment.svelte';
	import Comment from '@/lib/components/Comment/Comment.svelte';

	export let data: PageData;
	let comments = [
		{
			id: 1,
			name: 'Igor',
			message: 'text-1text-1text-1text-1text-1text-1text-1text-1text-1text-1text-1text-1text-1text-1text-1text-1text-1text-1text-1text-1text-1text-1text-1text-1text-1text-1',
			children: [],
		},
		{
			id: 2,
			name: 'Igor',
			message: 'text-2',
			children: [],
		},
		{
			id: 3,
			name: 'Igor',
			message: 'text-3',
			children: [
				{
					id: 32,
					name: 'Igor-2',
					message: 'text-32',
					children: [],
				},
				{
					id: 33,
					name: 'Igor-2',
					message: 'text-32',
					children: [],
				},
				{
					id: 34,
					name: 'Igor-2',
					message: 'text-32',
					children: [],
				},
				{
					id: 35,
					name: 'Igor-2',
					message: 'text-32',
					children: [],
				},
				{
					id: 36,
					name: 'Igor-2',
					message: 'text-32',
					children: [],
				},
			]
		}
	];
	async function handleSubmit({ detail: { parentId, message } }) {
		const index = comments[parentId].children ? comments[parentId].children.length : 0;
		comments[parentId].children[index] = ({id:1233, name: 'aaa', message: message, children: []})
		console.log(comments);
	}
</script>

<div class="container">
	<div class="title">Test 2</div>
	<CreateComment user="" />
	{#each comments as comment, index}
		<Comment commentData={comment} {index} on:new-comment={handleSubmit} />
	{/each}
</div>
