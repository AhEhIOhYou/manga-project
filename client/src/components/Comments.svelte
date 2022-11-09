<script lang="ts">

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
			<div class="comment-input-wrapper">
				<div class="comment-input p-relative" >
					<span class="comment-text" data-placeholder="write u're comment here" contenteditable="true"></span>
				</div>
				<div class="comment-action">
					<button class="comment-submit b-radius-10" type="submit">
						Sent message
					</button>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">

	$mainBGColor: #333333;

	[contenteditable=true]:empty:before {
		content: attr(data-placeholder);
		pointer-events: none;
		display: block;
	}

	.comments {
		min-width: 500px;
		background-color: $mainBGColor;

		.comment-container {
			height: 100%;
			overflow: auto;
			padding: 40px;
		}

		.comment-create {
			display: flex;
			margin: 30px 0;
		}

		.user-info {
			.user-avatar {
				width: 60px;
				height: 60px;
				border-radius: 50%;
				background-color: #ddd;
				background-size: cover;
				background-position: 50%;
				background-repeat: no-repeat;
				background-image: url('http://dummyimage.com/60x60/c0c0c0');
			}
		}

		.comment-input-wrapper {
			margin-left: 20px;
			flex-grow: 1;
			overflow: hidden;

			.comment-input {
				min-height: 36px;
				padding: 5px;
				border: 0;
				border-bottom: 2px solid #ffffff80;
				overflow: auto;
				outline: none;
				resize: none;
				font-size: 14px;
				line-height: 1.5;
				box-sizing: border-box;
				cursor: text;

				.comment-text {
					min-height: 20px;
					max-height: 200px;
					position: relative;
					outline: none;
				}
			}

			.comment-action {
				margin-top: 10px;
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
			};
		}
	}

</style>