<script lang="ts">
	import type { PageData } from '../$types';

	export let data: PageData;
</script>

<div class="container">
	<div class="title">Genres</div>
	<div class="genre-list" >
		{#each data.genres as genre}
		<div>
			<a class="bold underline" href="/genre/{genre.id}">{genre.name} ({genre.book_count})</a>
		</div>
	{/each}
	</div>
</div>

<style lang="scss">
	.genre-list {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 10px;

		//adaptive mobile
		@media (max-width: 600px) {
			grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
		}
	}
</style>
