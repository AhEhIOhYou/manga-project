<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let value = '';
	const dispatch = createEventDispatcher();

	function handleInput(event) {
		value = event.target.value;
		dispatch('input', { value });
	}
</script>

<div class="container-search">
	<input
		on:input={handleInput}
		class="search"
		type="text"
		autocomplete="off"
		placeholder="Boku no Pico"
		name="search"
		id="search"
		required
		bind:value
	/>
</div>

<style lang="scss">
	.container-search {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 1rem 0;

		.search {
			width: 100%;
			padding: 0.8rem;
			background-color: var(--list-hover);
			border-top: 0.25px solid transparent;
			border-right: 0.25px solid transparent;
			border-left: 0.25px solid transparent;
			border-radius: 20px 5px;
			font-size: 1.2rem;
			transition: all 0.2s ease-in-out;

			&:focus {
				outline: none;
				border-color: var(--green-sub);
			}
		}
	}
</style>
