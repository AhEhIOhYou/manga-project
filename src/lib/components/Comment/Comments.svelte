<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import CreateComment from './CreateComment.svelte';

	export let commentData;
	export let user = null;
	
	let replyMessage = '';

	const dispatch = createEventDispatcher();

	async function handleSubmit({ detail: { message } }) {
		dispatch('new-comment', {
			message
		});
	}

	function handleReply(userName: string) {
		replyMessage = `@${userName}, `;
	}
</script>

<CreateComment {user} message={replyMessage} on:submit={handleSubmit} />
{#each commentData as comment, index}
		<div class="comment-list__item dp-flex">
	<div class="user-info">
		<div class="user-avatar" />
	</div>
	<div class="comment-content">
		<div class="comment-content__data">
			<div class="comment-content__row mb-8">
				<div class="comment-content__username dp-i-block">
					{comment.userName}
				</div>
				<div class="comment-content__date dp-i-block">
					{comment.createdAt}
				</div>
			</div>
			<div class="comment-content__message mb-8">
				{comment.message}
				<!-- {#if commentData.is_deleted}
					<p style="color: grey;">comment deleted</p>
				{:else}
					{commentData.message}
				{/if} -->
			</div>
			<div class="comment-content__action">
				<button on:click={() => handleReply(comment.userName)}>Reply</button>
			</div>
		</div>
	</div>
</div>
{/each}

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
