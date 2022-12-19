<script lang="ts">
	import { deleteFile, saveFile } from '@/lib/utils';

	export let id: string;
	export let label: string;
	export let name: string;
	export let multiple: boolean = false;
	export let fileList: Array<string> = [];
	export let validFileTypes: Array<string> = [];
	export let fileCategory: string = '';
	let error: string;

	const handleDrop = async (event: DragEvent) => {
		await onFileSelected(event.dataTransfer.files);
	};
	const handleDragEnter = (event) => {};
	const handleDragLeave = (event) => {};

	//Delete files from server
	export const clearFiles = async () => {
		for (const file of fileList) {
			try {
				await deleteFile(file, fileCategory);
			} catch (err) {
				error = err;
			}
		}
	};

	//Uploads files to the server and add to the file list
	const onFileSelected = async (eventFiles) => {
		error = null;
		if (multiple) {
			for (const targetFile of eventFiles) {
				if (validFileTypes && !validFileTypes.includes(targetFile.type)) {
					error = 'Invalid file type';
					return;
				}

				try {
					const file = await saveFile(targetFile, fileCategory);
					fileList[fileList.length] = file;
				} catch (err) {
					error = err;
				}
			}
		} else {
			if (validFileTypes && !validFileTypes.includes(eventFiles[0].type)) {
				error = 'Invalid file type';
				return;
			}

			try {
				const file = await saveFile(eventFiles[0], fileCategory);
				fileList[0] = file;
			} catch (err) {
				error = err;
			}
		}
	};

	//Deletes a file from the server by file name
	const onFileDeleteBtn = async (fileName) => {
		error = null;
		if (fileName) {
			try {
				await deleteFile(fileName, fileCategory);
				fileList = fileList.filter((element) => element != fileName);
			} catch (err) {
				error = err;
			}
		}
	};
</script>

<label for={id} class="input-label">{label}</label>
<div
	class="drop-area"
	on:dragenter|stopPropagation|preventDefault={handleDragEnter}
	on:dragover|stopPropagation|preventDefault
	on:dragleave|stopPropagation|preventDefault={handleDragLeave}
	on:drop|stopPropagation|preventDefault={handleDrop}
>
	<input
		type="file"
		{name}
		{id}
		{multiple}
		accept="image/*"
		on:change={(e) => onFileSelected(e.target.files)}
		class="input-file"
	/>
	<label class=" input-label" for={id}>
		Drag &amp; Drop or
		<strong>select file</strong>
		to upload
	</label>
</div>
{#if error}
	<p class="error">{error}</p>
{/if}
{#if fileList}
	{#each fileList as file}
		<div class="wrapper-cover m-auto">
			<img src={`/src/upload/${fileCategory}/${file}`} alt="page" />
			<div class="delete-img" on:click={() => onFileDeleteBtn(file)}>X</div>
		</div>
	{/each}
{/if}

<style lang="scss">
	.delete-img {
		position: absolute;
		top: 0;
		right: 0;
		color: var(--white);
		padding: 5px;
		cursor: pointer;
		font-size: 20px;
	}
</style>
