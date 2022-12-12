<script lang="ts">
	import Contenteditable from '../Input/Contenteditable.svelte';
	import { createEventDispatcher } from 'svelte';
	import Button from '../Button.svelte';

	export let user;
	let message = '';
	let disabled = true;
	let error;

	$: disabled = message == '' ? true : false;
	$: if (message != '') error = null;

	const dispatch = createEventDispatcher();
	function handleSubmit() {
		error = null;
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

<form class="form comment-create" on:submit|preventDefault={handleSubmit}>
	<div class="user-info">
		<div class="user-avatar" />
	</div>
	<div class="comment-content">
		<div class="comment-input p-relative">
			<Contenteditable bind:value={message} />
		</div>
		<div class="comment-action">
			{#if error}
				<p class="error">{error}</p>
			{/if}
			<Button type="submit" {disabled}>Send message</Button>
		</div>
	</div>
</form>

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
				padding: 5px;
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

				.comment-submit {
					padding: 10px;
					border: none;
					font-size: 16px;
					line-height: 16px;
					cursor: pointer;
					background-color: #26ff0080;
					color: #fff;
				}
			}
		}
	}
</style>
