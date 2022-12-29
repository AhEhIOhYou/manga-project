<script lang="ts">
	import type { PageData } from './$types';
	import SignUpForm from '@/lib/components/Form/SignUpForm.svelte';
	import { goto } from '$app/navigation';
	export let data: PageData;

	let error;
	async function handleSubmit({ detail: { username, avatar, email, password } }) {
		const response = await fetch('/api/method/user.create', {
			method: 'POST',
			body: JSON.stringify({ username, avatar, email, password }),
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
		<SignUpForm on:submit={handleSubmit} />
	</div>
</div>

<style lang="scss">
	.size-ruler {
		margin: 0 auto;
		width: 20rem;
	}
</style>
