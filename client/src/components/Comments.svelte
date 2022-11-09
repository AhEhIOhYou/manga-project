<script lang="ts">
	const commentData = [
		{
			id: 123,
			user: {
				id: 1,
				name: "Ayaya",
				avatar: "http://dummyimage.com/50x50/c0c0c0",

			},
			message: "cool manga!cool manga!cool manga!cool manga!cool manga!cool manga!cool manga!cool manga!cool manga!cool manga!cool manga!cool manga!cool manga!cool manga!cool manga!cool manga!cool manga!cool manga!cool manga!cool manga!cool manga!cool manga!cool manga!",
			root_id: "",
			parent_id: "",
			like_count: 0,
			dislike_count: 0,
			child_count: 1,
			date: "09.10.2022",
		},
		{
			id: 123,
			user: {
				id: 1,
				name: "Ayaya",
				avatar: "http://dummyimage.com/50x50/c0c0c0",

			},
			message: "cool manga!",
			root_id: "",
			parent_id: "",
			dislike_count: 0,
			child_count: 0,
			date: "09.10.2022",
		},
		{
			id: 123,
			user: {
				id: 1,
				name: "Ayaya",
				avatar: "http://dummyimage.com/50x50/c0c0c0",

			},
			message: "cool manga!",
			root_id: "",
			parent_id: "",
			dislike_count: 0,
			child_count: 0,
			date: "09.10.2022",
		}
	]
</script>

<div class="comments b-radius-10 p-relative">
	<div class="comment-container border-box">
		<h1 class="title">
			Comments
		</h1>
		<div class="comment-create">
			<div class="user-info">
				<div class="user-avatar"></div>
			</div>
			<div class="comment-content">
				<div class="comment-input p-relative">
					<div class="comment-text p-relative" placeholder="write your comment here" contenteditable="true"></div>
				</div>
				<div class="comment-action">
					<button class="comment-submit b-radius-10" type="submit">
						Sent message
					</button>
				</div>
			</div>
		</div>
		<div class="comment-list">
			{#each commentData as comment}
			<div class="comment-list__item dp-flex">
				<div class="user-info">
					<div class="user-avatar"></div>
				</div>
				<div class="comment-content">
					<div class="comment-content__data">
						<div class="comment-content__row mb-8">
							<div class="comment-content__username dp-i-block">
								{comment.user.name}
							</div>
							<div class="comment-content__date dp-i-block">
								{comment.date}
							</div>
						</div>
						<div class="comment-content__message mb-8">
							{comment.message}
						</div>
						<div class="comment-content__action">
							#Reply $Like
						</div>
					</div>
					<div class="comment-content__replies mtb-10">
						{#if comment.child_count > 0}
							<button class="load-replies-btn dp-flex">
								<span>Load replies</span>
								<span class="icon-more"></span>
							</button>
						{/if}
					</div>
				</div>
			</div>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">

	$mainBGColor: #333333;

	.comments {
		min-width: 500px;
		background-color: $mainBGColor;


		.comment-container {
			height: 100%;
			overflow: auto;
			padding: 40px;

			.comment-create {
				display: flex;
				margin: 30px 0;
			}

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
						font-size: 18px;
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

			.comment-list__item {
				margin-top: 20px;

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
	}
</style>