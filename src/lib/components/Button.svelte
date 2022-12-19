<script lang="ts">
	export let type: string = 'button';
	export let disabled: boolean = false;
</script>

<button {type} {disabled} class="button">
	<slot />
</button>
