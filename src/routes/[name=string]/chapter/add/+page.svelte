<script lang="ts">
	import type { PageData } from './$types';
	import CreateChapterForm from '@/lib/components/Form/CreateChapterForm.svelte';
	export let data: PageData;
	let error;
	
	const bookId = 8;

	async function handleSubmit({ detail: { title, volume, number, translator, files } }) {
		let pages = [];
		let chapterId;
		const responseChapter = await fetch('/api/method/chapter.add', {
			method: 'POST',
			body: JSON.stringify({
				title,
				volume,
				number,
				translator,
				bookId
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const bodyChapter = await responseChapter.json();
		if (responseChapter.ok) {
			chapterId = bodyChapter.id;
			files.forEach((element, index) => {
				pages.push({
					fileName: element,
					number: index + 1,
				});
			});
		} else {
			error = bodyChapter.message;
		}

		const responsePages = await fetch('/api/method/pages.add', {
			method: 'POST',
			body: JSON.stringify({
				chapterId,
				pages
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const bodyPages = await responseChapter.json();
		if (responsePages.ok) {
			console.log(bodyPages);

			console.log('круто');
		} else {
			error = bodyPages.message;
		}
	}
</script>

<div class="container">
	<div class="title">Add chapter</div>
	{#if error}
		<p class="error">{error}</p>
	{/if}
	<CreateChapterForm  on:submit={handleSubmit} />
</div>
