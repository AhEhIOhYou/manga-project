<script lang="ts">
	import { onMount } from 'svelte';

	export let id;
	export let label;
	export let name;
	export let required = false;
	export let options = [];

	let selectedOption = {
		id: null,
		text: ''
	};

	let relatedOptions = options;
	let displayOption = 'none';
	let showEmptyOption = false;
	let datalist;
	let currentFocus = -1;

	$: if (selectedOption.text) {
		displayOption = 'block';
		relatedOptions = options.filter(
			(option) => option.display.toUpperCase().indexOf(selectedOption.text.toUpperCase()) > -1
		);
		if (relatedOptions.length === 0) {
			showEmptyOption = true;
		} else {
			showEmptyOption = false;
		}
	} else {
		selectedOption.id = null;
		displayOption = 'none';
	}

	function handleKeydown(e) {
		if (e.keyCode == 40) {
			currentFocus++;
			updateStyles(datalist.options);
		} else if (e.keyCode == 38) {
			currentFocus--;
			updateStyles(datalist.options);
		} else if (e.keyCode == 13) {
			e.preventDefault();
			if (currentFocus > -1) {
				/*and simulate a click on the "active" item:*/
				if (datalist.options) {
					datalist.style.display = 'none';
					datalist.options[currentFocus].click();
				}
			}
		}
	}

	function handleFocusout() {
		displayOption = 'none';
	}

	function updateStyles(x) {
		if (!x) return false;
		if (currentFocus < 0) currentFocus = x.length - 1;
		if (currentFocus >= x.length) currentFocus = 0;

		for (let i = 0; i < x.length; i++) {
			x[i].style = 'background-color: var(--container-main-sub);';
		}

		x[currentFocus].style = 'background-color: var(--green-sub)';
	}
</script>

<div>
	<label for={id} class="input-label">{label}</label>
	<input
		{name}
		{id}
		{required}
		class="input-field"
		autocomplete="off"
		placeholder="Select option"
		bind:value={selectedOption.text}
		on:keydown={handleKeydown}
		on:focusout={handleFocusout}
	/>
	<div class="p-relative">
		<datalist class="datalist" style:display={displayOption} bind:this={datalist}>
			{#if showEmptyOption}
				<option value="Empty" disabled>Empty</option>
			{/if}
			{#each relatedOptions as option}
				<option
					class="datalist-option"
					value={option.value}
					on:click={() => {
						selectedOption.text = option.display;
						selectedOption.id = option.value;
					}}
				>
					{option.display}
				</option>
			{/each}
		</datalist>
	</div>
</div>

<style lang="scss">
	.datalist {
		position: absolute;
		background-color: var(--container-main-sub);
		border-radius: 0 0 5px 5px;
		border-top: none;
		padding: 5px;
		max-height: 10rem;
		overflow-y: auto;
		width: 100%;

		.datalist-option {
			padding: 5px;
		}
	}

	option:hover,
	.active {
		background-color: black;
	}
</style>
