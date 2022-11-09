<script lang="ts">
	import Comment from '@/components/comment/Comment.svelte';
	import CreateComment from '@/components/comment/CreateComment.svelte';
	import type { CommentType } from '@/models/comment.model';
	import { fade } from 'svelte/transition';

	const bookId: number = 12;
	const chapterId: number = -1;
	const userId: number = 1;

	const commentData: Array<CommentType> = [];

	const handleComment = (event) => {
		var l = commentData.length;
		commentData[l] = event.detail;
		console.log(commentData);
	}
</script>

<div class="comments b-radius-10 p-relative">
	<div class="comment-container border-box">
		<h1 class="title">Comments</h1>
		<svelte:component this={CreateComment} {bookId} {chapterId} {userId} on:newComment={handleComment} />
		<div class="comment-list">
			{#each [...commentData].reverse() as comment}
				<svelte:component this={Comment} commentData={comment} />
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
