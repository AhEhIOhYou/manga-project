<script lang="ts">
	import ChapterItem from './ChapterItem.svelte';
	export let chaptersData;
	export let showAll = true;

	let showMoreBtnActive = false;
	let showMoreActive = false;
	let firstPart = chaptersData;
	let secondPart = [];

	if (!showAll) {
		if (chaptersData.length > 2) {
			firstPart = chaptersData.slice(0, 2);
			secondPart = chaptersData.slice(2, chaptersData.length);
			showMoreBtnActive = true;
		}
	}
</script>

<div class="container dp-block">
	<div class="chapters">
		<h1 class="title">Chapters</h1>
		<ul class="chapters-list mtb-10">
			{#if chaptersData.length == 0}
				<p>Empty</p>
			{:else}
				{#each firstPart as data}
					<ChapterItem chapterItemData={data} />
				{/each}
				{#if showMoreActive}
					{#each secondPart as data}
						<ChapterItem chapterItemData={data} />
					{/each}
				{/if}
			{/if}
		</ul>
		{#if showMoreBtnActive}
			<div class="show-more-container">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					class="show-more-text"
					on:click={() => {
						showMoreActive = true;
						showMoreBtnActive = false;
					}}
				>
					Show more!
				</div>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.chapters {
		height: 100%;
		overflow: auto;
	}
</style>
