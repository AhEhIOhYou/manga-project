<script lang="ts">
	import { getCroppedImg } from '../../utils';

	export let value = '';
	export let id;
	export let label;
	export let name;
	export let required = false;
	let error;

	let img;
	const onFileSelected = async (e) => {
		let image = e.target.files[0];
		try {
			value = await saveFile(e.target.files[0]);
		} catch (err) {
			error = err;
		}
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = async (e) => {
			img = e.target.result;
			// let res = await getCroppedImg(img, {x:0, y:0, width: 250, height:320} );
		};
	};

	const onFileDeleteBtn = async (e) => {
		if (value) {
			try {
				await deleteFile(value);
				value = '';
				img = '';
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
	{#if img}
		<div class="wrapper-cover m-auto">
			<img src={img} alt={name} />
		</div>
		<button on:click|preventDefault={onFileDeleteBtn}> Delete img </button>
	{/if}
	<input
		type="file"
		{name}
		{id}
		{required}
		accept=".jpg, .jpeg, .png"
		on:change={(e) => onFileSelected(e)}
		class="form__field"
	/>
</div>