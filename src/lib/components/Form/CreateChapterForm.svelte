<script lang="ts">
	import Input from '../Input/Input.svelte';
	import Button from '../Button.svelte';
	import FileInput from '../Input/FileInput.svelte';
	import { createEventDispatcher } from 'svelte';
	import TranslationTeamInput from '../Input/TranslationTeamInput.svelte';

	let title = '';
	let volume = '';
	let number = '';
	let translator;
	let files = [];
	let error;
	let validFileTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
	const fileCategory = 'pages';

	const dispatch = createEventDispatcher();
	function handleSubmit() {
		if (!files.length) {
			error = 'No cover';
			return;
		}
		dispatch('submit', {
			title,
			volume,
			number,
			translator,
			files
		});
	}
</script>

{#if error}
	<p class="error">{error}</p>
{/if}
<form class="form-grid" on:submit|preventDefault={handleSubmit}>
	<Input label="Title" id="title" name="title" type="text" required bind:value={title} />
	<Input label="Volume" id="volume" name="volume" type="number" required bind:value={volume} />
	<Input label="Number" id="number" name="number" type="number" required bind:value={number} />
	<TranslationTeamInput
		id={'translation_team'}
		name={'transltranslation_teamator'}
		label={'Translation team'}
		required={true}
		bind:value={translator}
	/>
	<div class="full-width">
		<FileInput
			{fileCategory}
			{validFileTypes}
			bind:fileList={files}
			multiple={true}
			label="Pages"
			id="pages"
			name="pages"
		/>
	</div>
	<Button type="submit">Create book</Button>
</form>
