<script lang="ts">
	import Input from '../Input/Input.svelte';
	import Button from '../Button.svelte';
	import { createEventDispatcher } from 'svelte';

	let authorName = '';
	let error;
	let info = 'Accepted: chars, numbers, spaces, dashes, underscores. Min size - 2 chars.';

	const dispatch = createEventDispatcher();
	function handleSubmit() {
		error = null;
		const regex = /^[a-zA-Z0-9-_ ]{3,}$/;
		const regexSecond = /[a-zA-Z]/g;
		if (!regex.test(authorName) || authorName.split(regexSecond).length < 2) {
			error = 'Invalid name';
			return;
		}
		dispatch('submit', {
			authorName
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
	<Input
		label="Author Name"
		id="authorName"
		name="authorName"
		type="text"
		required
		bind:value={authorName}
	/>
	<Button type="submit">Create</Button>
</form>
