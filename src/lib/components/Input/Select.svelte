<script>
	export let value = '';
	export let id;
	export let label;
	export let name;
	export let required = false;
	export let inputRef = null;
	export let options = [];
</script>

<div class="form__group field">
	<select class="form__field" {name} {id} {required} bind:value bind:this={inputRef}>
		{#each options as optionValue}
			<option>{optionValue}</option>
		{/each}
	</select>
	<label for={id} class="form__label">{label}</label>
</div>
