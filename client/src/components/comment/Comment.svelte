<script lang="ts">
	import type { CommentType } from '@/models/comment.model'
	import CreateComment from '@/components/comment/CreateComment.svelte';
	export let commentData: CommentType;
	let showCreateComment = false;
</script>

<div id="comment-{commentData.id}" class="comment-list__item dp-flex">
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
				<button on:click={() => showCreateComment = !showCreateComment}>{#if !showCreateComment}Reply{:else}Cancel{/if}</button> $Like
			</div>
		</div>
		<div class="comment-content__replies mtb-10">
			{#if showCreateComment}
				<svelte:component this={CreateComment} bookId={0} chapterId={-1} userId={1}/>
			{/if}
			{#if commentData.child_count > 0}
				<button class="load-replies-btn dp-flex">
					<span>Load replies</span>
					<span class="icon-more"></span>
				</button>
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	.comment-list__item {
				margin-top: 20px;

				.user-info {
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

					.comment-content__action {

					}
				}
			}
</style>