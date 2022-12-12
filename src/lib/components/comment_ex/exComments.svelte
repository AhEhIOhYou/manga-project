<script lang="ts">
	import { onMount } from 'svelte';
	import Comment from '@/lib/components/comment/Comment.svelte';
	import CreateComment from '@/lib/components/comment/CreateComment.svelte';
	import type { CommentType } from '@/lib/server/domain/entities';

	export let bookId = 0;
	export let chapterId = null;

	const userId = 1;
	const parentId = 0;

	let commentData: Array<CommentType> = [];

	const commentsLoading = async (bookId, parentId, chapterId,) => {
		const chapterQueryParam: string = chapterId == null ? '' : `&chapter_id=${chapterId}`;
		const url: string = `/api/comment?book_id=${bookId}&parent_id=${parentId}` + chapterQueryParam;

		const res = await fetch(url, {
			mode: 'cors',
			method: 'GET'
		});
		const data = await res.json();
		if (res.ok) {
			commentData = data;
		} else {
			throw new Error(data.message);
		}
	}

	const addComment = (event: CustomEvent) => {
		commentData[commentData.length] = event.detail;
	};
</script>

<div class="container b-radius-10 p-relative">
	<div class="comments">
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
			{#await commentsLoading(bookId, parentId, chapterId)}
				<p>...loading</p>
			{:then}
				{#if commentData.length == 0}
					<p>Be the first!</p>
				{:else}
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
				{/if}
			{:catch error}
				<p>Attention! {error}</p>
			{/await}
		</div>
	</div>
</div>

<style lang="scss">
	.comments {
		height: 100%;
		overflow: auto;
	}
</style>
