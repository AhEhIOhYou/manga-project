<script lang="ts">
	import Comment from '@/components/comment/Comment.svelte';
	import CreateComment from '@/components/comment/CreateComment.svelte';
	import type { CommentType } from '@/models/comment.model'
	import { fade } from 'svelte/transition';
	import { storeElements, idIncrement } from '@/components/comment/store.js';

	$storeElements = [
		{ id:0, name: 'First option', otherattrib: "additional note" },
    	{ id:1, name: 'Second option' },
    	{ id:2, name: 'Third option' },
	];

	const bookId: number = 12;
	const chapterId: number = -1;
	const userId: number = 1;

	const commentData: Array<CommentType> = [
		{
			id: 123,
			user: {
				id: 1,
				name: 'Ayaya',
				avatar: 'http://dummyimage.com/50x50/c0c0c0'
			},
			message:
				'cool manga!cool manga!cool manga!cool manga!cool manga!cool manga!cool manga!cool manga!cool manga!cool manga!cool manga!cool manga!cool manga!cool manga!cool manga!cool manga!cool manga!cool manga!cool manga!cool manga!cool manga!cool manga!cool manga!',
			like_count: 0,
			dislike_count: 0,
			child_count: 1,
			date: '09.10.2022'
		},
		{
			id: 124,
			user: {
				id: 1,
				name: 'Ayaya',
				avatar: 'http://dummyimage.com/50x50/c0c0c0'
			},
			message: 'cool manga!',
			like_count: 0,
			dislike_count: 0,
			child_count: 0,
			date: '09.10.2022'
		},
		{
			id: 125,
			user: {
				id: 1,
				name: 'Ayaya',
				avatar: 'http://dummyimage.com/50x50/c0c0c0'
			},
			message: 'cool manga!',
			like_count: 0,
			dislike_count: 0,
			child_count: 0,
			date: '09.10.2022'
		}
	];
</script>

<div class="comments b-radius-10 p-relative">
	<div class="comment-container border-box">
		<h1 class="title">Comments</h1>
		<svelte:component this={CreateComment} bookId={bookId} chapterId={chapterId} userId={userId}/>
		<div class="comment-list">
			{#each commentData as comment}
				<svelte:component this={Comment} commentData={comment}/>
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
