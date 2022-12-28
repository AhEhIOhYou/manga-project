<script lang="ts">
	import type { PageData } from '../../author/create/$types';
	import CreateTranslationTeam from '@/lib/components/Form/CreateTranslationTeam.svelte';
	import { goto } from '$app/navigation';
	export let data: PageData;

	let error;
	async function handleSubmit({ detail: { tname } }) {
		error = null;
		const response = await fetch('/api/method/translationteam.create', {
			method: 'POST',
			body: JSON.stringify({ tname }),
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
		<CreateTranslationTeam on:submit={handleSubmit} />
	</div>
</div>

<style lang="scss">
	.size-ruler {
		margin: 0 auto;
		width: 20rem;
	}
</style>