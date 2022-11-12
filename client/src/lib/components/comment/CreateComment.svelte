<script lang="ts">
	import type { CommentType } from '@/lib/models/comment.model';
	import { createEventDispatcher } from 'svelte';

	export let bookId: number;
	export let chapterId: number;
	export let userId: number;
	export let rootId: number;
	export let parentId: number;

	const dispatch = createEventDispatcher<{ newComment: CommentType }>();

	let sendBtnActive: boolean = false;
	let message: string;

	$: message == '' ? (sendBtnActive = false) : (sendBtnActive = true);

	const send = () => {
		let date: Date = new Date();

		const newComment: CommentType = {
			id: Math.floor(Math.random() * 210000),
			user: {
				id: userId,
				name: 'Yayaya',
				avatar: 'http://dummyimage.com/50x50/c0c0c0'
			},
			book_id: bookId,
			chapter_id: chapterId,
			message: message,
			root_id: rootId,
			parent_id: parentId,
			like_count: 0,
			dislike_count: 0,
			child_count: 0,
			date: date.toDateString()
		};

		message = '';
		dispatch('newComment', newComment);
	};
</script>

<div class="comment-create">
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
			<button
				on:click={send}
				disabled={!sendBtnActive}
				class="comment-submit b-radius-10"
				type="submit">Send message</button
			>
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
