<script>
	export let value = {
		from: '',
		to: ''
	};
	export let id;
	export let label = '';
	export let name;
	export let autocomplete = 'off';
	export let required = '';

	let requiredFirst = false;
	let requiredSecond = false;

	switch (required) {
		case 'from':
			requiredFirst = true;
			break;
		case 'to':
			requiredSecond = true;
			break;
		case 'both':
			requiredFirst = true;
			requiredSecond = true;
			break;
		default:
			break;
	}

	const placeholderFrom = `From`;
	const placeholderTo = `To`;
</script>

{#if label}
	<label for={id} class="input-label">{label}</label>
{/if}
<div class="input-group">
	<input
		type="number"
		{autocomplete}
		placeholder={placeholderFrom}
		{name}
		{id}
		required={requiredFirst}
		bind:value={value.from}
		class="input-field"
	/>
	<span>-</span>
	<input
		type="number"
		{autocomplete}
		placeholder={placeholderTo}
		{name}
		{id}
		required={requiredSecond}
		bind:value={value.to}
		class="input-field"
	/>
</div>

<style lang="scss">
	.input-group {
		display: flex;
		align-items: center;

		span {
			margin: 0 0.5rem;
		}
	}
</style>
