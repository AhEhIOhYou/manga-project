<script lang="ts">
	export let bookData;
	const background =  `linear-gradient(180deg, ${bookData.avgColor} 0%, var(--background-body) 100%)`;
</script>

<svelte:head>
	<title>{bookData.title}</title>
</svelte:head>

<div class="container-book" style:background>
	<div class="wrapper">
		<div>
			<div class="wrapper-cover">
				<img src={bookData.cover_url} alt="book cover" />
			</div>
		</div>
		<div class="book-data">
			<div class="book-data__type">
				{bookData.type}
			</div>
			<h1 class="book-data__title">
				{bookData.title}
			</h1>
			<h2 class="book-data__alt-title">
				{bookData.alt_title}
			</h2>
			<div class="book-data__author" >
				by <a class="bold underline" href="/author/{bookData.author}">
					{bookData.author}
				</a>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.container-book {
		width: 100%;
		background: linear-gradient(180deg, #ffffff 0%, var(--background-body) 100%);
		padding: 60px;

		.wrapper {
			width: 100%;
			max-width: 800px;
			display: flex;
			flex-direction: row;
			justify-content: start;
			gap: 20px;
			margin: 0 auto;

			.book-data {
				display: flex;
				flex-direction: column;
				justify-content: center;
				gap: 10px;

				.book-data__type {
					color: var(--text-primary);
					font-style: italic;
					font-weight: bold;
				}

				.book-data__title {
					color: var(--text-primary);
					font-weight: bold;
				}

				.book-data__alt-title {
					color: var(--text-primary-sub);
					font-style: italic;
					text-shadow: 0 0 1px var(--text-primary-sub);
				}
			}

			@media (max-width: 740px) {
				flex-direction: column;
				align-items: center;
				gap: 10px;

				.book-data {
					align-items: center;
					text-align: center;
				}
			}
		}
	}
</style>
