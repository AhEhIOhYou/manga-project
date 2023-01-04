<script lang="ts">
	import Input from '../Input/Input.svelte';
	import Button from '../Button.svelte';
	import { createEventDispatcher } from 'svelte';

	let gname = '';
	let error;
	let info = 'Accepted: chars, spaces, dashes, underscores. Min size - 3 chars.';

	const dispatch = createEventDispatcher();
	function handleSubmit() {
		error = null;
		const regex = /^[a-zA-Z-_ ]{3,}$/;
		const regexSecond = /[a-zA-Z]/g;
		if (!regex.test(gname) || gname.split(regexSecond).length < 3) {
			error = 'Invalid name';
			return;
		}
		dispatch('submit', {
			gname
		});
	}
</script>

{#if info}
	<p class="info">{info}</p>
{/if}
{#if error}
	<p class="error">{error}</p>
{/if}
<form class="form" on:submit|preventDefault={handleSubmit}>
	<Input label="Genre Name" id="gname" name="gname" type="text" required bind:value={gname} />
	<Button type="submit">Create</Button>
</form>
