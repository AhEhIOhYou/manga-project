<script lang="ts">
	import { createEventDispatcher } from "svelte";


	export let id;
	export let label;
	export let name;
	export let required = false;
	let options = [];

	export let value = {
		id: null,
		name: ''
	};

	let placeholder = 'Select team';
	let relatedOptions = options;
	let displayOption = 'none';
	let showEmptyOption = false;
	let datalist;
	let currentFocus = -1;

	async function handleInput(e) {
		if (value.name) {
			try {
				const response = await fetch('/api/method/translationteam.get', {
					method: 'POST',
					body: JSON.stringify({ name: value.name }),
					headers: {
						'Content-Type': 'application/json'
					}
				});
				const body = await response.json();
				if (response.ok) {
					options = body;
				}
			} catch (e) {
				console.error(e.message);
			}

			displayOption = 'block';
			relatedOptions = options.filter(
				(option) => option.name.toUpperCase().indexOf(value.name.toUpperCase()) > -1
			);
			if (relatedOptions.length === 0) {
				showEmptyOption = true;
			} else {
				showEmptyOption = false;
			}
		} else {
			value.id = null;
			displayOption = 'none';
		}
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
		{placeholder}
		bind:value={value.name}
		on:input={handleInput}
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
					value={option.id}
					on:click={() => {
						value.name = option.name;
						value.id = option.id;
					}}
				>
					{option.name}
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
</style>
