<script>
	export let selected = 1;
	export let id;
	export let label;
	export let name;
	export let required = false;
	export let options = [];
</script>

<div>
	<label for={id} class="input-label">{label}</label>
	<select {name} {id} {required} bind:value={selected} class="input-field">
		{#each options as option}
			<option value={option.id}>
				{option.text}
			</option>
		{/each}
	</select>
</div>
