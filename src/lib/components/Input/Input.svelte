<script>
	export let value = '';
	export let id;
	export let label;
	export let type = 'text';
	export let name;
	export let required = false;
	export let inputRef = null;
	export let autocomplete = 'off';
	function setType(node) {
		node.type = type;
	}
</script>

<div>
	<label for={id} class="input-label">{label}</label>
	<input
		use:setType
		{autocomplete}
		placeholder={label}
		{name}
		{id}
		{required}
		bind:value
		bind:this={inputRef}
		class="input-field"
	/>
</div>
