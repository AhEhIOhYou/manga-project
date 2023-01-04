<script lang="ts">
	import { DateTimeFormatter } from '../util_classes/DateTimeFormatter';
	import Button from './Button.svelte';
	export let bookData;
	const createdAtString: string = DateTimeFormatter.toDateString(bookData.created_at);

	const genres = [
		{ title: 'Action', link: 'action' },
		{ title: 'Adventure', link: 'adventure' },
		{ title: 'Comedy', link: 'comedy' },
		{ title: 'Crime', link: 'crime' },
		{ title: 'Drama', link: 'drama' },
		{ title: 'Fantasy', link: 'fantasy' }
	];

	const tags = [
		{ title: 'Historical', link: 'historical' },
		{ title: 'Horror', link: 'horror' },
		{ title: 'Mystery', link: 'mystery' },
		{ title: 'Romance', link: 'romance' },
		{ title: 'Science Fiction', link: 'science-fiction' },
		{ title: 'Thriller', link: 'thriller' },
		{ title: 'Western', link: 'western' }
	];
</script>

<div class="book-description">
	<div class="book-description__text">
		<p class="book-description__description">{bookData.description}</p>
	</div>
	<div class="book-description__list">
		<div class="book-description__item">
			<p>Created at:</p>
			<p>{createdAtString}</p>
		</div>
		<div class="book-description__item">
			<p>Released:</p>
			<p>{bookData.release_year}</p>
		</div>
		<div class="book-description__item">
			<p>Uploaded by:</p>
			<p>
				<a class="bold underline" href="/user/{bookData.loader_username}"
					>{bookData.loader_username}</a
				>
			</p>
		</div>
		<div class="book-description__item">
			<p>Genre(s):</p>
			<div class="book-description__genres">
				{#each genres as genre}
					<div class="box__item">
						<a href="/genre/{genre.link}" class="bold underline book-description__genre"
							>{genre.title}</a
						>
					</div>
				{/each}
			</div>
		</div>
		<div class="book-description__item">
			<p>Tag(s):</p>
			<div class="book-description__tags">
				{#each tags as tag}
					<div class="box__item">
						<a href="/tag/{tag.link}" class="bold underline book-description__tag">{tag.title}</a>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.book-description {
		width: 100%;
		margin: 0 auto;
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 20px;

		&__text {
			width: 100%;
			display: flex;
			flex-direction: column;
			gap: 10px;

			.book-description__description {
				line-height: 1.5;
			}
		}

		&__list {
			display: flex;
			flex-direction: column;
			gap: 10px;
		}

		&__item {
			line-height: 1.5;
			display: grid;
			grid-template-columns: 1fr 2fr;
			word-wrap: break-word;
		}

		&__genres {
			display: flex;
			flex-direction: row;
			gap: 10px;
			flex-wrap: wrap;
		}

		&__tags {
			display: flex;
			flex-direction: row;
			gap: 10px;
			flex-wrap: wrap;
		}
	}

	//adaptive mobile
	@media screen and (max-width: 470px) {
		.book-description {
			&__list {
				flex-direction: column;
				gap: 10px;
			}

			&__item {
				grid-template-columns: 1fr 1fr;
			}
		}
	}
</style>
