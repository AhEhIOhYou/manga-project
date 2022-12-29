<script lang="ts">
	import { page } from '$app/stores';
	import { DateTimeFormatter } from '../util_classes/DateTimeFormatter';
	import Button from './Button.svelte';
	export let bookData;
	const createdAtString: string = DateTimeFormatter.toDateString(bookData.created_at);
</script>

<svelte:head>
	<title>{bookData.title}</title>
</svelte:head>

<div class="container">
	<div class="book-container">
		<div class="book-left">
			<div class="wrapper-cover">
				<img src={bookData.cover_url} alt="book cover" />
				<div class="book-type-img">{bookData.type}</div>
				<div class="book-year-img">{bookData.release_year}</div>
			</div>
			<div class="book-created">
				Created at: {createdAtString}
			</div>
			<div class="book-add-chapter">
				<Button>
					<a href={$page.url + '/chapter/add'}> Add chapter </a>
				</Button>
			</div>
		</div>
		<div class="book-right">
			<div class="book-info__title">
				<h2>{bookData.title}</h2>
			</div>
			<div class="book-info__alt-title">
				<h2>{bookData.alt_title}</h2>
			</div>
			<div class="book-info__author">
				<h3>by {bookData.author}</h3>
			</div>
			<div class="book-info__description">
				<p>{bookData.description}</p>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.book-container {
		display: flex;
		flex-direction: row;
		justify-content: start;
		width: 100%;
		max-width: 1000px;
		gap: 20px;

		.book-left {
			.wrapper-cover {
				position: relative;

				.book-type-img {
					position: absolute;
					top: 0;
					right: 0;
					background-color: var(--container-main-sub);
					color: var(--text-primary);
					font-style: italic;
					font-weight: bold;
					padding: 5px;
					font-size: 0.8rem;
				}

				.book-year-img {
					position: absolute;
					bottom: 0;
					left: 0;
					background-color: var(--container-main-sub);
					color: var(--text-primary);
					font-style: italic;
					font-weight: bold;
					padding: 5px;
					font-size: 0.8rem;
				}
			}

			.book-created {
				text-align: center;
				color: var(--text-primary-sub);
				padding-bottom: 10px;
			}

			.book-add-chapter {
				text-align: center;
				padding-bottom: 10px;
			}
		}

		.book-right {
			width: 100%;
			display: flex;
			flex-direction: column;
			padding: 10px;

			.book-info {
				&__title {
					&:after {
						content: '';
						display: block;
						width: 100%;
						height: 2px;
						background-color: var(--container-main-sub);
						margin: 4px 0;
					}
				}

				&__alt-title {
					color: var(--text-primary-sub);
					padding-bottom: 10px;
				}

				&__description {
					padding: 10px 0;
				}
			}
		}
	}

	@media only screen and (max-width: 680px) {
		.book-container {
			flex-direction: column;
		}

		.book-left {
			width: 100%;
		}

		.book-right {
			width: 100%;
			padding: 0 30px 30px;
			gap: 5px;
		}
	}
</style>
