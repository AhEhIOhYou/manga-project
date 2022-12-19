<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let user = null;
	export let message = '';
	let error;

	$: disabled = message == '' ? true : false;
	$: if (message != '') error = null;

	const dispatch = createEventDispatcher();
	function handleSubmit() {
		error = null;
		if (!user) {
			error = 'Please, login to comment';
			return;
		}
		message = message.replace(/&nbsp;/g, ' ').trim();
		if (!message) {
			error = 'Empty comment';
			return;
		}
		dispatch('submit', {
			message
		});
		message = '';
	}
</script>

<div class="comment-create">
	<div class="user-info">
		<div class="user-avatar" />
	</div>
	<div class="comment-content">
		{#if error}
			<p class="error">{error}</p>
		{/if}
		<div class="comment-input p-relative">
			<div
				id="message"
				name="message"
				placeholder="Message"
				contenteditable="plaintext-only"
				bind:innerHTML={message}
			/>
		</div>
		<div class="comment-action">
			<button class="create-btn" on:click={handleSubmit}>Send message</button>
		</div>
	</div>
</div>

<style lang="scss">
	.comment-create {
		display: flex;
		margin: 30px 0;

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

			.comment-content__replies {
				.load-replies-btn {
					font-size: 14px;
					background-color: transparent;
					border: none;
					color: #26ff0080;
					cursor: pointer;
				}
			}

			.comment-input {
				min-height: 36px;
				padding: 5px 0;
				border-bottom: 2px solid #ffffff80;
				overflow: auto;
				cursor: text;

				.comment-text {
					line-height: 1.4;
					min-height: 20px;
					max-height: 200px;
					outline: none;
				}
			}

			.comment-action {
				margin-top: 20px;
				text-align: right;

				.create-btn {
					margin-top: 5px;
					color: var(--white);
					padding: 0.5em 1em;
					border-radius: 5px;
					background-color: var(--btn-main);
				}
			}
		}
	}
</style>
