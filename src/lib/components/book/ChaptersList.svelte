<script lang="ts">
	import ChapterItem from './ChapterItem.svelte';

	export let bookId: number = 0;
	const chaptersLoading = async (bookId: number) => {
		const url: string = `api/chapter?book_id=${bookId}`;
		const res: Response = await fetch(url, {
			mode: 'cors',
			method: 'GET'
		});

		const data: any = await res.json();

		if (res.ok) {
			return data;
		} else {
			throw new Error(data.message);
		}
	};
</script>

<div class="container dp-block">
	<div class="chapters">
		<h1 class="title">Chapters</h1>
		{#await chaptersLoading(bookId)}
			<p>...loading</p>
		{:then chaptersData} 
		<ul class="chapters-list mtb-10">
			{#if chaptersData.length == 0}
				<p>Chapters empty</p>
			{:else}
				{#each chaptersData as data}
					<ChapterItem chapterItemData={data} />
				{/each}
			{/if}
		</ul>
		<div class="show-more-container">
			<div class="show-more-text">Show more!</div>
		</div>
		{:catch error}
			<p>Attention! {error}</p>
		{/await}
	</div>
</div>

<style lang="scss">
	.chapters {
		height: 100%;
		overflow: auto;
	}
</style>
