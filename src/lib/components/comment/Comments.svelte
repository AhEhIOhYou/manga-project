<script lang="ts">
	import { onMount } from 'svelte';
	import Comment from '@/lib/components/comment/Comment.svelte';
	import CreateComment from '@/lib/components/comment/CreateComment.svelte';
	import type { CommentType } from '@/lib/types/';

	export let bookId = 0;
	export let chapterId = null;

	const userId = 1;
	const parentId = 0;

	let commentData: Array<CommentType> = [];

	onMount(async () => {
		const chapterQueryParam: string = chapterId == null ? '' : `chapter_id=${chapterId}`;
		const url: string = `/api/comment?book_id=${bookId}&parent_id=${parentId}` + chapterQueryParam;

		const res = await fetch(url, {
			mode: 'cors',
			method: 'GET'
		});
		if (res.ok) {
			commentData = await res.json();
		} else {
			throw new Error('');
		}
	});

	const addComment = (event: CustomEvent) => {
		commentData[commentData.length] = event.detail;
	};
</script>

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
