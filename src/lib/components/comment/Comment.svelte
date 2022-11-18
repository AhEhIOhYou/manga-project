<script lang="ts">
	import type { CommentType } from '@/lib/types/';
	import CreateComment from '@/lib/components/comment/CreateComment.svelte';

	export let bookId: number;
	export let chapterId: number;
	export let userId: number;
	export let rootId: number;
	export let parentId: number;
	export let commentData: CommentType;

	//временное
	const isAdmin = true;
	const isOwner = false;

	let showCreateComment: boolean = false;
	let showGetReplyBtn: boolean = commentData.child_count > 0;
	let showReplies: boolean = false;
	let showDeleteBtn: boolean = (isAdmin || isOwner) && !commentData.is_deleted ? true : false;
	let replies: Array<CommentType> = [];
	if (rootId == 0) rootId = commentData.id;
	parentId = commentData.id;

	const getReplies = async () => {
		showReplies = !showReplies;
		if (showReplies) {
			const chapterQueryParam: string = chapterId == null ? '' : `chapter_id=${chapterId}`;
			const url: string =
				`/api/comment?book_id=${bookId}&parent_id=${parentId}` + chapterQueryParam;

			const res = await fetch(url, {
				mode: 'cors',
				method: 'GET'
			});
			if (res.ok) {
				replies = await res.json();
			} else {
				throw new Error('');
			}
		}
	};

	const addComment = (event: CustomEvent) => {
		replies[replies.length] = event.detail;
		showGetReplyBtn = true;
		commentData.child_count++;
		showReplies = true;
		showCreateComment = false;
	};

	const deleteComment = async () => {
		if (showDeleteBtn) {
			const url: string = `/api/comment?comment_id=${commentData.id}`;

			const res = await fetch(url, {
				mode: 'cors',
				method: 'DELETE'
			});
			if (res.ok) {
				commentData.message = '';
			} else {
				throw new Error('');
			}
		}
		showDeleteBtn = false;
	};
</script>

<div class="comment-list__item dp-flex">
	<div class="user-info">
		<div class="user-avatar" />
	</div>
	<div class="comment-content">
		<div class="comment-content__data">
			<div class="comment-content__row mb-8">
				<div class="comment-content__username dp-i-block">
					{commentData.user.name}
				</div>
				<div class="comment-content__date dp-i-block">
					{commentData.created_at}
				</div>
			</div>
			<div class="comment-content__message mb-8">
				{#if commentData.is_deleted}
					<p style="color: grey;">comment deleted</p>
				{:else}
					{commentData.message}
				{/if}
			</div>
			<div class="comment-content__action">
				<button on:click={() => (showCreateComment = !showCreateComment)}
					>{#if !showCreateComment}Reply{:else}Cancel{/if}</button
				>
				{#if showDeleteBtn}
					<button on:click={() => deleteComment()} class="load-replies-btn dp-flex">
						Delete
					</button>
				{/if}
				^Like vDislike
				{#if showGetReplyBtn}
					<div class="show-more-container">
						<div class="show-more-text">
							<button on:click={() => getReplies()} class="load-replies-btn dp-flex">
								{#if !showReplies}Load replies{:else}Close replies{/if}
							</button>
						</div>
					</div>
				{/if}
			</div>
		</div>
		<div class="comment-content__replies mtb-10">
			{#if showCreateComment}
				<svelte:component
					this={CreateComment}
					{bookId}
					{chapterId}
					{userId}
					{rootId}
					{parentId}
					on:newComment={addComment}
				/>
			{/if}
			{#if showReplies}
				{#each replies as item}
					<svelte:self {bookId} {chapterId} {userId} {rootId} {parentId} commentData={item} />
				{/each}
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	.comment-list__item {
		margin-top: 20px;

		.user-info {
			position: relative;

			.user-avatar {
				width: 50px;
				height: 50px;
				border-radius: 30%;
				background-color: #ddd;
				background-size: cover;
				background-position: 50%;
				background-repeat: no-repeat;
				background-image: url('http://dummyimage.com/60x60/c0c0c0');
			}
		}

		.comment-content {
			flex-grow: 1;
			margin-left: 20px;
			overflow: hidden;

			.comment-content__data {
				.comment-content__row {
					.comment-content__username {
						font-size: 18px;
					}

					.comment-content__date {
						font-size: 14px;
						color: rgb(165, 165, 165);
					}
				}

				.comment-content__message {
					font-size: 18px;
				}
			}
		}
	}
</style>
