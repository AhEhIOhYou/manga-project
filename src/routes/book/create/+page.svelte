<script lang="ts">
	import Modal from '@/lib/shared/ui/modal/Modal.svelte';
	import ImageCrop from '@/lib/components/ImageCrop.svelte';
	import Cropper from 'svelte-easy-crop';
	let showModal = false;
	import type { PageData } from './$types';

	export let data: PageData;

	const handleSubmit = (e) => {
		const ACTION_URL = e.target.action;

		// get the form fields data and convert it to URLSearchParams
		const formData = new FormData(e.target);
		const data = new URLSearchParams();
		for (let field of formData) {
			const [key, value] = field;
			data.append(key, value);
		}

		// check the form's method and send the fetch accordingly
		if (e.target.method.toLowerCase() == 'get') fetch(`${ACTION_URL}?${data}`);
		else {
			fetch(ACTION_URL, {
				method: 'POST',
				body: data
			});
		}
	};

	let fileinput;
	let files;
	let cover;
	let cropCover;

	function onFileSelected(e) {
		let imageFile = e.target.files[0];
		let reader = new FileReader();
		reader.onload = e => {
			cover = e.target.result
		};
		reader.readAsDataURL(imageFile);
		showModal = true;
	}

</script>

<div class="container">
	<div class="title">Create book</div>
	<form class="form dp-flex fd-column align-center" on:submit|preventDefault={handleSubmit}>
		<div class="form__group field">
			<input
				type="input"
				class="form__field"
				placeholder="Title"
				autocomplete="off"
				name="name"
				id="title"
				required
			/>
			<label for="title" class="form__label">Title</label>
		</div>
		<div class="form__group field">
			<input
				type="input"
				class="form__field"
				placeholder="Alternative title"
				autocomplete="off"
				name="alt-title"
				id="alt-title"
			/>
			<label for="alt-title" class="form__label">Alternative title</label>
		</div>
		<div class="form__group field">
			<input
				type="input"
				class="form__field"
				placeholder="Author"
				autocomplete="off"
				name="author"
				id="author"
				required
			/>
			<label for="author" class="form__label">Author</label>
		</div>
		<div class="form__group field">
			<select class="form__field" name="type" id="type" required>
				<option> Manga </option>
				<option> Manhua </option>
				<option> Comics </option>
			</select>
			<label for="type" class="form__label">Type</label>
		</div>
		<div class="form__group field">
			<input type="date" class="form__field" name="release-date" id="release-date" required />
			<label for="release-date" class="form__label">Release Date</label>
		</div>
		<div class="form__group field">
			<label for="file" class="form__label">Cover</label>
			<input
				class="form__field"
				id="file"
				type="file"
				accept=".png,.jpg"
				on:change={(e)=>onFileSelected(e)}
				bind:this={fileinput}
			/>
			{#if cropCover}
				<div class="p-relative mtb-10">
					<img class="m-auto" width="250" height="320" id="avatar" src={cropCover} alt="avatar" />
				</div>
			{/if}
		</div>
		<div class="form__group field">
			<textarea
				class="form__field"
				rows="1"
				placeholder="Description"
				name="description"
				id="description"
			/>
			<label for="description" class="form__label">Description</label>
		</div>
		<button class="btn" type="submit">Create</button>
	</form>
</div>

{#if showModal && cover != null}
	<Modal on:close={() => (showModal = false)}>
		<div slot="header">Crop cover</div>
		<div slot="content">
			<ImageCrop
				image={cover}
				on:save={(e) => {
					cropCover = e.detail.img;
					showModal = false;
				}}
				on:reset={() => (cover = null)}
			/>
		</div>
	</Modal>
{/if}

<style lang="scss">
	.form__group {
		position: relative;
		padding: 15px 0 0;
		margin-top: 10px;
		width: 50%;
	}

	.form__field {
		font-family: inherit;
		width: 100%;
		border: 0;
		color: var(--text-primary);
		border-bottom: 2px solid var(--gray-sub);
		outline: 0;
		font-size: 1.3rem;
		padding: 7px 0;
		background: transparent;
		transition: border-color 0.2s;

		&::placeholder {
			color: transparent;
		}

		&:placeholder-shown ~ .form__label {
			font-size: 1.3rem;
			cursor: text;
			top: 20px;
		}
	}

	.form__label {
		position: absolute;
		top: 0;
		display: block;
		transition: 0.2s;
		font-size: 1rem;
		color: var(--gray-sub);
	}

	.form__field:focus {
		~ .form__label {
			position: absolute;
			top: 0;
			display: block;
			transition: 0.2s;
			font-size: 1rem;
			color: var(--green-main);
		}
		padding-bottom: 6px;
		border-width: 3px;
		border-color: var(--green-main);
	}
</style>
