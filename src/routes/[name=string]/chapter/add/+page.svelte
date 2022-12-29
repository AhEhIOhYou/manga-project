<script lang="ts">
	import type { PageServerData } from './$types';
	import CreateChapterForm from '@/lib/components/Form/CreateChapterForm.svelte';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { goto, afterNavigate } from '$app/navigation';
	import { base } from '$app/paths';


	let previousPage: string = base;

	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
	});

	export let data: PageServerData;
	const bookId = data.bookId;
	let error;

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
					number: index + 1
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
		const bodyPages = await responsePages.json();

		if (responsePages.ok) {
			goto(previousPage);
		} else {
			error = bodyPages.message;
		}
	}

	let ready = false;
	onMount(() => (ready = true));
</script>

{#if ready}
	<div
		class="container"
		in:fly={{
			y: 30,
			delay: 70 * 1,
			easing: cubicOut
		}}
	>
		<div class="title">Add chapter</div>
		{#if error}
			<p class="error">{error}</p>
		{/if}
		<CreateChapterForm on:submit={handleSubmit} />
	</div>
{/if}
