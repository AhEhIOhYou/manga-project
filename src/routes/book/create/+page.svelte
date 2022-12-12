<script lang="ts">
	import type { PageData } from './$types';
	import CreateBookForm from '@/lib/components/Form/CreateBookForm.svelte';
	import { goto } from '$app/navigation';
	export let data: PageData;
	let error;

	async function handleSubmit({
		detail: { title, altTitle, author, type, cover, description, release }
	}) {
		const response = await fetch('/api/method/book.create', {
			method: 'POST',
			body: JSON.stringify({
				title,
				altTitle,
				author,
				type,
				cover,
				description,
				release
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const body = await response.json();
		if (response.ok) {
			goto('/' + body.link_title);
		}
		error = body.message;
	}
</script>

<svelte:head>
	<title>Create book</title>
</svelte:head>

<div class="container">
	<div class="title">Create book</div>
	{#if error}
		<p class="error">{error}</p>
	{/if}
	<CreateBookForm on:submit={handleSubmit}/>
</div>
