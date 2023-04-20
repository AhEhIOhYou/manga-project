<script>
	export let value = 0;
	export let id;
	export let label = '';
	export let name;
	export let min = 0;
	export let max = 100;
	export let step = 1;
</script>

<div class="input-wrapper">
	{#if label}
		<label for={id} class="input-label">{label}</label>
	{/if}
	<input class="input-range" {name} {id} type="range" {min} {max} {step} bind:value />
	<span>{value} px</span>
</div>

<style lang="scss">
	.input-wrapper {
		display: flex;
		flex-direction: column;
		gap: 10px;

		.input-range {
			-webkit-appearance: none;
			height: 5px;
		}
		.input-range::-webkit-slider-thumb {
			appearance: none;
			width: 15px;
			height: 15px;
			border-radius: 50%;
			background: var(--green-sub);
			cursor: pointer;
		}
	}
</style>
