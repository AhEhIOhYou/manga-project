<script>
	export let selected = 1;
	export let id;
	export let label = '';
	export let name;
	export let required = false;
	export let options = [];
</script>

<div>
	{#if label}
		<label for={id} class="input-label">{label}</label>
	{/if}
	<select {name} {id} {required} bind:value={selected} class="input-field">
		{#each options as option}
			<option class="input__option" value={option.id}>
				{option.text}
			</option>
		{/each}
	</select>
</div>
