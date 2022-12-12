<script lang="ts">
	import Input from '../Input/Input.svelte';
	import Button from '../Button.svelte';
	import FileInput from '../Input/FileInput.svelte';
	import { createEventDispatcher } from 'svelte';

	let title = '';
	let volume = '';
	let number = '';
	let translator = '';
	let files = [];
	const dispatch = createEventDispatcher();
	function handleSubmit() {
		dispatch('submit', {
			title,
			volume,
			number,
			translator,
			files
		});
	}
</script>

<form class="form dp-flex fd-column align-center" on:submit|preventDefault={handleSubmit}>
	<Input label="Title" id="title" name="title" type="text" required bind:value={title} />
	<Input label="Volume" id="volume" name="volume" type="number" required bind:value={volume} />
	<Input label="Number" id="number" name="number" type="number" required bind:value={number} />
	<Input
		label="Translator"
		id="translator"
		name="translator"
		type="text"
		required
		bind:value={translator}
	/>
	<FileInput bind:fileList={files} multiple={true} label="Pages" id="pages" name="pages" required />
	<Button type="submit">Create book</Button>
</form>
