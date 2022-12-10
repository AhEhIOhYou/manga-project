<script lang="ts">
	import type { PageData } from './$types';
	import CreateChapterForm from '@/lib/components/Form/CreateChapterForm.svelte';
	import { goto } from '$app/navigation';
	export let data: PageData;
	let error;
	const bookId = 8;

	async function handleSubmit({ detail: { title, volume, number, translator, files } }) {
		let chapterId = {};
		console.log(arguments);
		
		const responseChapter = await fetch('/api/method/chapter.add', {
			method: 'POST',
			body: JSON.stringify({
				title, volume, number, translator, bookId
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const bodyChapter = await responseChapter.json();
		if (responseChapter.ok) {
			// chapterId = bodyChapter.id;
			console.log(bodyChapter);
			console.log(files);
		}
		error = bodyChapter.message;

		const responsePages = await fetch('/api/method/pages.add', {

		});
	}
</script>

<div class="container">
	<div class="title">Add chapter</div>
	{#if error}
		<p class="error">{error}</p>
	{/if}
	<CreateChapterForm on:submit={handleSubmit} />
</div>