<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { DateTimeFormatter } from '@/lib/util_classes/DateTimeFormatter';
	import CreateComment from './CreateComment.svelte';

	export let commentData;
	export let index;
	export let level = 0;

	let btnReplyState = false;
	let btnChildrenState = false;
	let btnChildrenShow = false;
	let children = [];
	const childrenLoadStep = 10;
	let childrenAdded = 0;

	const createdAtString: string = DateTimeFormatter.Since('12.11.2022');

	const dispatch = createEventDispatcher();

	async function handleSubmit({ detail: { message } }) {
		dispatch('new-comment', {
			parentId: index,
			message
		});
		btnChildrenShow = true;
		btnReplyState = false;
		showChildren(++childrenAdded);
	}

	$: if (commentData.children.length > 0) {
		btnChildrenShow = true;
		btnChildrenState = true;
	}

	$: if (commentData.children.length == children.length) {
		btnChildrenShow = false;
	}
	function showChildren(count: number = 0) {
		if (!btnChildrenShow) {
			children = [];
			btnChildrenShow = true;
		} else {
			const to = count ? count : children.length + childrenLoadStep;
			children = commentData.children.slice(0, to);
		}
	}
</script>

<div class="comment-list__item dp-flex">
	<div class="user-info">
		<div class="user-avatar" />
	</div>
	<div class="comment-content">
		<div class="comment-content__data">
			<div class="comment-content__row mb-8">
				<div class="comment-content__username dp-i-block">
					{commentData.name}
				</div>
				<div class="comment-content__date dp-i-block">
					{createdAtString}
				</div>
			</div>
			<div class="comment-content__message mb-8">
				{commentData.message}
				<!-- {#if commentData.is_deleted}
					<p style="color: grey;">comment deleted</p>
				{:else}
					{commentData.message}
				{/if} -->
			</div>
			<div class="comment-content__action">
				<button on:click={() => (btnReplyState = !btnReplyState)}
					>{#if !btnReplyState}Reply{:else}Cancel{/if}</button
				>
				{#if btnChildrenState}
					<button on:click={() => showChildren()} class="load-replies-btn">
						{#if btnChildrenShow}Load replies{:else}Close replies{/if}
					</button>
				{/if}
			</div>
		</div>
		<div class="comment-content__replies mtb-10">
			{#if btnReplyState}
				<CreateComment user="" on:submit={handleSubmit} />
			{/if}
			{#if children}
				{#each children as item}
					<svelte:self commentData={item} level={++level} {index} on:new-comment={handleSubmit}/>
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
