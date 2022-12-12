<script lang="ts">
	import { deleteFile, saveFile } from '@/lib/utils';

	export let id: string;
	export let label: string;
	export let name: string;
	export let required: boolean = false;
	export let multiple: boolean = false;
	export let fileList: Array<string> = [];
	export let validFileTypes: Array<string> = [];
	export let fileCategory: string = '';
	let error: string;

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
	const onFileSelected = async (e) => {
		error = null;
		for (const targetFile of e.target.files) {
			if (validFileTypes && !validFileTypes.includes(targetFile.type)) {
				error = 'Invalid file type';
				return;
			}

			try {
				const file = await saveFile(targetFile, fileCategory);
				if (!multiple) {
					if (fileList[0]) await deleteFile(fileList[0], fileCategory);
					fileList[0] = file;
				} else {
					fileList[fileList.length] = file;
				}
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

<div class="form__group field">
	<label for={id} class="form__label">{label}</label>
	{#if error}
		<p class="error">{error}</p>
	{/if}
	{#if fileList}
		{#each fileList as file}
			<div class="wrapper-cover m-auto">
				<img src={`/src/upload/${fileCategory}/${file}`} alt="page" />
			</div>
			<button on:click|preventDefault={() => onFileDeleteBtn(file)}> Delete img </button>
		{/each}
	{/if}
	<input
		type="file"
		{name}
		{id}
		{required}
		{multiple}
		accept=".jpg,.jpeg,.png"
		on:change={(e) => onFileSelected(e)}
		class="form__field"
	/>
</div>
