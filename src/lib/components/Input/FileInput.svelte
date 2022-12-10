<script lang="ts">
	export let fileList = [];
	export let id;
	export let label;
	export let name;
	export let required = false;
	export let multiple = false;
	let error;

	const onFileSelected = async (e) => {
		for (const targetFile of e.target.files) {
			try {
				const file = await saveFile(targetFile);
				multiple ? (fileList[fileList.length] = file) : (fileList[0] = file);
			} catch (err) {
				error = err;
			}
		}
	};

	const onFileDeleteBtn = async (fileName) => {
		if (fileName) {
			try {
				await deleteFile(fileName);
				fileList = fileList.filter((element) => element != fileName);
			} catch (err) {
				error = err;
			}
		}
	};

	async function saveFile(file: Blob): Promise<string> {
		let form: FormData = new FormData();
		form.append('image', file, file.name);
		const response = await fetch('/api/method/file', {
			method: 'POST',
			body: form
		});
		const body = await response.json();
		if (response.ok) {
			return body.file;
		} else {
			throw body.message;
		}
	}

	async function deleteFile(fileName: string): Promise<string> {
		const response = await fetch('/api/method/file', {
			method: 'DELETE',
			body: JSON.stringify({ file: fileName })
		});
		const body = await response.json();
		if (response.ok) {
			return body.file;
		} else {
			throw body.message;
		}
	}
</script>

<div class="form__group field">
	<label for={id} class="form__label">{label}</label>
	{#if error}
		<p class="error">{error}</p>
	{/if}
	{#if fileList}
		{#each fileList as file}
			<div class="wrapper-cover m-auto">
				<img src={`/src/upload/${file}`} alt="page" />
			</div>
			<button on:click|preventDefault={() => onFileDeleteBtn(file)}> Delete img </button>
		{/each}
	{/if}
	<input
		type="file"
		value=""
		{name}
		{id}
		{required}
		{multiple}
		accept=".jpg, .jpeg, .png"
		on:change={(e) => onFileSelected(e)}
		class="form__field"
	/>
</div>
