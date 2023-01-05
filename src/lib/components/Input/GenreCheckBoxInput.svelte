<script lang="ts">
	export let selectedGenres = [];
	export let id;
	export let label = '';
	export let name;
	export let data = [];
</script>

{#if label}
	<label for={id} class="input-label">{label}</label>
{/if}
<div class="genre-list">
	{#each data as genre}
		<label>
			<input type="checkbox" id={genre.id} bind:group={selectedGenres} value={genre.id} />
			{genre.name}
		</label>
	{/each}
</div>

<style lang="scss">
	.genre-list {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 10px;
		padding: 1em;

		@media (max-width: 600px) {
			grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
		}
	}
</style>
