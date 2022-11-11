<script lang="ts">
	import Comment from '@/components/comment/Comment.svelte';
	import CreateComment from '@/components/comment/CreateComment.svelte';
	import type { CommentType } from '@/models/comment.model';

	const userId: number = 1;

	export let bookId: number = 0;
	export let chapterId: number = -1;

	const commentData: Array<CommentType> = [];

	const addComment = (event: CustomEvent) => (commentData[commentData.length] = event.detail);
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

			.comment-list {
			}
		}
	}
</style>
