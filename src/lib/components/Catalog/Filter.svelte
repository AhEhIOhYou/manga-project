<script lang="ts">
	import Button from '../Button.svelte';
	import CheckBoxInput from '../Input/CheckBoxInput.svelte';
	import InputGroup from '../Input/InputGroup.svelte';

	const genres = [
		{
			id: 3,
			name: 'testcon'
		},
		{
			id: 4,
			name: 'testcon-1'
		},
		{
			id: 5,
			name: 'testcon 2'
		},
		{
			id: 6,
			name: 'testcon 3'
		},
		{
			id: 7,
			name: 'testcon 4'
		},
		{
			id: 8,
			name: 'testcon 5'
		}
	];

	let selectedGenres = [];

	$: console.log(selectedGenres);
	let release_year;
</script>

<div class="container-filter">
	<div class="filter__item">
		<div class="genre-list">
			<CheckBoxInput
				label="Genres"
				name="genres"
				id="genres"
				data={genres}
				bind:selected={selectedGenres}
			/>
		</div>
	</div>
	<div class="filter__item">
		<div class="filter-range">
			<InputGroup
				label="Release Year"
				name="release_year"
				id="release_year"
				bind:value={release_year}
			/>
		</div>
	</div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="action">
		<div class="action__item" on:click={() => console.log('apply')}>
			<Button type="button">Apply</Button>
		</div>
		<div class="action__item" on:click={() => console.log('reset')}>
			<Button type="button">Reset</Button>
		</div>
	</div>
</div>

<style lang="scss">
	.container-filter {
		display: flex;
		flex-direction: column;
		justify-content: start;
		margin-bottom: 15px;

		.filter__item {
			margin-bottom: 1rem;

			.filter-range {
				max-width: 300px;
			}
		}

		.action {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
		}
	}
</style>
