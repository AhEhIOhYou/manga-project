<script lang="ts">
	import type { PageData } from './$types';
	import SignInForm from '@/lib/components/SignInForm.svelte';
	import { goto } from '$app/navigation';
	export let data: PageData;

	let error;
	async function handleSubmit({ detail: { login, password } }) {
		const response = await fetch('/api/method/user.login', {
			method: 'POST',
			body: JSON.stringify({ login, password }),
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
	<div class="title">Sign In</div>
	{#if error}
		<p class="error">{error}</p>
	{/if}
	<SignInForm on:submit={handleSubmit} />
</div>
