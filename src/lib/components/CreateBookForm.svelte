<script lang="ts">
	import Input from './Input/Input.svelte';
	import Select from './Input/Select.svelte';
	import Button from './Button.svelte';
	import FileInput from './Input/FileInput.svelte';
	import { createEventDispatcher } from 'svelte';

	let title = '';
	let altTitle = '';
	let author = '';
	let type = '';
	let cover = '';
	let description = '';
	let release;
	const dispatch = createEventDispatcher();
	function handleSubmit() {
		dispatch('submit', {
			title,
			altTitle,
			author,
			type,
			cover,
			description,
			release,
		});
	};
	
</script>

<form class="form dp-flex fd-column align-center" on:submit|preventDefault={handleSubmit}>
	<Input label="Title" id="title" name="title" type="text" required bind:value={title} />
	<Input
		label="Alternative title"
		id="alt-title"
		name="alt-title"
		type="text"
		bind:value={altTitle}
	/>
	<Input label="Author" id="author" name="author" type="text" required bind:value={author} />
	<Input label="Description" id="description" name="description" type="text" bind:value={description} />
	<Input label="Year release" id="release" name="release" type="number" bind:value={release} />
	<Select
		label="Type"
		id="Type"
		name="Type"
		options={['Manga', 'Manhua', 'Comics']}
		bind:value={type}
		required
	/>
	<FileInput bind:value={cover} label="Cover" id="cover" name="cover" required />
	<Button type="submit">Create book</Button>
</form>