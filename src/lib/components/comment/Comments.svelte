<script lang="ts">
	import { onMount } from 'svelte';
	import Comment from '@/lib/components/comment/Comment.svelte';
	import CreateComment from '@/lib/components/comment/CreateComment.svelte';
	import type { CommentType } from '@/lib/types/';

	const userId = 1;

	export let bookId = 0;
	export let chapterId = -1;

	let commentData: Array<CommentType> = [];

	async function getComments() {
		const url: string = `/api/book?id=1`;
		const res = await fetch(url, {
			mode: 'cors',
			method: 'GET'
		});
		let data: Array<CommentType> = await res.json();
		commentData = data;

		if (res.ok) {
			return data;
		} else {
			throw new Error('');
		}
	}

	const addComment = (event: CustomEvent) => (commentData[commentData.length] = event.detail);
</script>

<button on:click={getComments}> Click me </button>
<div class="comments b-radius-10 p-relative">
	<div class="comment-container border-box">
		<h1 class="title">Comments</h1>
		<svelte:component
			this={CreateComment}
			{bookId}
			{chapterId}
			{userId}
			rootId={0}
			parentId={0}
			on:newComment={addComment}
		/>
		<div class="comment-list">
			{#each commentData as comment}
				<svelte:component
					this={Comment}
					{bookId}
					{chapterId}
					{userId}
					commentData={comment}
					rootId={0}
					parentId={0}
				/>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	$mainBGColor: #333333;

	.comments {
		min-width: 500px;
		background-color: $mainBGColor;

		.comment-container {
			height: 100%;
			overflow: auto;
			padding: 40px;

			// .comment-list {
			// }
		}
	}
</style>
