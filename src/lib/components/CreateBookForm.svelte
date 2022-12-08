<script lang="ts">
	import Input from './Input.svelte';
	import Select from './Select.svelte';
	import Button from './Button.svelte';
	import FileInput from './FileInput.svelte';
	import { createEventDispatcher } from 'svelte';
	import FilePond, { registerPlugin, supported } from 'svelte-filepond';
	import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
	import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
	registerPlugin(FilePondPluginImagePreview, FilePondPluginImageExifOrientation);

	let title = '';
	let altTitle = '';
	let author = '';
	let type = '';
	let cover = '';
	let description = '';
	let release;
	let error;
	let coverInputRef;
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
	<Input label="Release Date" id="release" name="release" type="date" bind:value={release} />
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