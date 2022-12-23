<script lang="ts">
	import type { PageData } from '../../author/create/$types';
	import { goto } from '$app/navigation';
	import CreateAuthor from '@/lib/components/Form/CreateAuthor.svelte';
	export let data: PageData;
	
	let error;

	async function handleSubmit({ detail: { authorName } }) {
		error = null;
		const response = await fetch('/api/method/author.create', {
			method: 'POST',
			body: JSON.stringify({ authorName }),
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
	<div class="title">Sign Up</div>
	{#if error}
		<p class="error">{error}</p>
	{/if}
	<div class="size-ruler">
		<CreateAuthor on:submit={handleSubmit} />
	</div>
</div>

<style lang="scss">
	.size-ruler {
		margin: 0 auto;
		width: 20rem;
	}
</style>