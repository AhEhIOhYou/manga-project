<script lang="ts">
	import type { CommentType } from '@/lib/models/comment.model';
	import CreateComment from '@/lib/components/comment/CreateComment.svelte';

	export let bookId: number;
	export let chapterId: number;
	export let userId: number;
	export let rootId: number;
	export let parentId: number;
	export let commentData: CommentType;

	let showCreateComment: boolean = false;
	let replies: Array<CommentType> = [];
	if (rootId == 0) rootId = commentData.id;
	parentId = commentData.id;

	const getReplies = () => {
		console.log(replies);
	};

	const addComment = (event: CustomEvent) => {
		replies[replies.length] = event.detail;
		showCreateComment = false;
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
					{commentData.date}
				</div>
			</div>
			<div class="comment-content__message mb-8">
				{commentData.message}
			</div>
			<div class="comment-content__action">
				<button on:click={() => (showCreateComment = !showCreateComment)}
					>{#if !showCreateComment}Reply{:else}Cancel{/if}</button
				>
				<button on:click={() => getReplies()} class="load-replies-btn dp-flex">
					Load replies
				</button>
				^Like vDislike
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
			{#each replies as item}
				<svelte:self {bookId} {chapterId} {userId} {rootId} {parentId} commentData={item} />
			{/each}
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
