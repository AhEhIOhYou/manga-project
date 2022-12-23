<script lang="ts">
	import Input from '../Input/Input.svelte';
	import Button from '../Button.svelte';
	import { createEventDispatcher } from 'svelte';

	let tname = '';
	let error;
	let info = 'Accepted: chars, numbers, spaces, dashes, underscores. Min size - 3 chars.';

	const dispatch = createEventDispatcher();
	function handleSubmit() {
		error = null;
		const regex = /^[a-zA-Z0-9-_ ]{3,}$/;
		const regexSecond = /[a-zA-Z]/g;
		if (!regex.test(tname) || tname.split(regexSecond).length < 3) {
			error = 'Invalid name';
			return;
		}
		dispatch('submit', {
			tname
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
	<Input label="Team Name" id="tname" name="tname" type="text" required bind:value={tname} />
	<Button type="submit">Create</Button>
</form>
