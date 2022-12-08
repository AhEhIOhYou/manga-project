<script>
	export let value = '';
	export let id;
	export let label;
	export let type = 'text';
	export let name;
	export let required = false;
	export let inputRef = null;
	export let autocomplete = "off";
	function setType(node) {
		node.type = type;
	}
</script>

<div class="form__group field">
	<input use:setType {autocomplete} placeholder={label} {name} {id} {required} bind:value bind:this={inputRef} class="form__field" />
	<label for={id} class="form__label">{label}</label>
</div>
