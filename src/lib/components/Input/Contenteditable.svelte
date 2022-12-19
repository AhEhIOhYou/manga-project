<script lang="ts">
	export let value = '';
	export let id;
	export let label;
	export let name;
	export let placeholder = 'Text';

	let borderColor = 'var(--green-main)';
	$: borderColor = value != '' ? 'var(--green-main)' : 'var(--gray-sub)';
</script>

<span class="input-label">{label}</span>
<div
	class="input-field"
	style:border-color={borderColor}
	{id}
	{name}
	{placeholder}
	contenteditable="plaintext-only"
	bind:innerHTML={value}
/>
