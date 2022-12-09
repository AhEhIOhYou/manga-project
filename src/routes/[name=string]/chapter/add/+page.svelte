<!-- <script lang="ts">
	import type { PageData } from './$types';
	import FilePond, { registerPlugin, supported } from 'svelte-filepond';

	import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
	import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
	import type { ChapterType, PageType } from '@/lib/server/domain/entities';

	registerPlugin(FilePondPluginImagePreview, FilePondPluginImageExifOrientation);

	let pond: FilePond;
	let name = 'page-image';

	const handleSubmit = async (e) => {
		const formData = new FormData(e.target);
		const data: any = {};
		for (let field of formData) {
			const [key, value] = field;
			data[key] = value;
		}

		let newPages: Array<PageType> = [];
		pond.getFiles().forEach((file, index) => {
			newPages.push({
				file_name: JSON.parse(file.serverId).file,
				chapter_id: 1,
				loader_user_id: 1,
				created_at: new Date().toISOString(),
				number: index
			});
		});

		const newChapter: ChapterType = {
			title: data.title,
			volume: Number(data.volume),
			number: Number(data.number),
			translator: data.translator,
			book_id: 1,
			loader_user_id: 1,
			created_at: new Date().toISOString(),
			page_count: newPages.length
		};

		const pageApiUrl = `/api/method/page.add`;
		const chapterApiUrl = `/api/method/chapter.add`;

		let chapterRes = await fetch(chapterApiUrl, {
			mode: 'cors',
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newChapter)
		});
		console.log(newPages);

		let pagesRes = await fetch(pageApiUrl, {
			mode: 'cors',
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newPages)
		});
	};

	let sendActive = false;
	export let data: PageData;
</script>

<div class="container">
	<div class="title">Add chapter</div>
	<form class="form dp-flex fd-column align-center" on:submit|preventDefault={handleSubmit}>
		<div class="form__group field">
			<input
				type="input"
				class="form__field"
				placeholder="Title"
				autocomplete="off"
				name="title"
				id="title"
				required
			/>
			<label for="title" class="form__label">Title</label>
		</div>
		<div class="form__group field">
			<input
				type="number"
				class="form__field"
				placeholder="Alternative title"
				autocomplete="off"
				name="volume"
				id="volume"
				required
			/>
			<label for="volume" class="form__label">Volume</label>
		</div>
		<div class="form__group field">
			<input
				type="number"
				class="form__field"
				placeholder="Author"
				autocomplete="off"
				name="number"
				id="number"
				required
			/>
			<label for="number" class="form__label">Number</label>
		</div>
		<div class="form__group field">
			<input
				type="text"
				class="form__field"
				placeholder="Author"
				autocomplete="off"
				name="translator"
				id="translator"
				required
			/>
			<label for="translator" class="form__label">Translator</label>
		</div>
		<div class="form__group field">
			<div for="pages" class="form__label">Pages</div>
			<div class="field__pages">
				<FilePond
					bind:this={pond}
					{name}
					server="/api/method/file"
					allowMultiple={true}
					allowReorder={true}
					onprocessfiles={() => (sendActive = true)}
					credits={{}}
				/>
			</div>
		</div>
		<button class="btn" type="submit" disabled={!sendActive}> Send </button>
	</form>
</div>

<style lang="scss">
	.form .form__group {
		.field__pages {
			padding-top: 10px;
		}
	}
</style> -->

<script lang="ts">
	import type { PageData } from './$types';
	import CreateChapterForm from '@/lib/components/Form/CreateChapterForm.svelte';
	import { goto } from '$app/navigation';
	export let data: PageData;
	let error;

	async function handleSubmit({ detail: { title, altTitle, author, type, cover, description, release } }) {
		
	}
</script>

<div class="container">
	<div class="title">Add chapter</div>
	{#if error}
		<p class="error">{error}</p>
	{/if}
	<CreateChapterForm on:submit={handleSubmit} />
</div>