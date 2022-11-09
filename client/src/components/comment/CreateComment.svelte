<script lang="ts">
	import { onMount } from "svelte";

	let commentId: string;
	let message: string;
	export let bookId:number = -1;
	export let chapterId:number = -1;
	export let userId:number = 0;
	let sendBtnActive =  false;

	onMount(async () => {
		commentId = "_" + Math.random().toString(36).substr(2, 9);
	});

	$: message == '' ? sendBtnActive = false : sendBtnActive = true;

	const send = () => {
		const bookData = {
			bookId: bookId,
			chapterId: chapterId,
			userId: userId,
			message: message,
		}
		console.log(bookData);
	}
</script>

<div id="{commentId}" class="comment-create">
	<div class="user-info">
		<div class="user-avatar" />
	</div>
	<div class="comment-content">
		<div class="comment-input p-relative">
			<div
				class="comment-text p-relative"
				placeholder="write your comment here"
				contenteditable="true"
				bind:innerHTML={message}
			/>
		</div>
		<div class="comment-action">
			<button on:click={send} disabled={!sendBtnActive} class="comment-submit b-radius-10" type="submit">Send message</button>
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
