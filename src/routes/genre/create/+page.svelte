<script lang="ts">
	import type { PageData } from '../../author/create/$types';
	import { goto } from '$app/navigation';
	import CreateGenreForm from '@/lib/components/Form/CreateGenreForm.svelte';
	export let data: PageData;

	let error;
	async function handleSubmit({ detail: { gname } }) {
		error = null;
		const response = await fetch('/api/method/genre', {
			method: 'POST',
			body: JSON.stringify({ gname }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const body = await response.json();
		if (response.ok) {
			goto('/');
		}
		error = body.message;
	}
</script>

<div class="container">
	<div class="title">Cretae genre</div>
	{#if error}
		<p class="error">{error}</p>
	{/if}
	<div class="size-ruler">
		<CreateGenreForm on:submit={handleSubmit} />
	</div>
</div>

<style lang="scss">
	.size-ruler {
		margin: 0 auto;
		width: 20rem;
	}
</style>
