<script lang="ts">
	import type { PageData } from './$types';
	import SignUpForm from '@/lib/components/Form/SignUpForm.svelte';
	import { goto } from '$app/navigation';
	export let data: PageData;

	let error;
	async function handleSubmit({ detail: { username, email, password } }) {
		const response = await fetch('/api/method/user.create', {
			method: 'POST',
			body: JSON.stringify({ username, email, password }),
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
	<SignUpForm on:submit={handleSubmit} />
</div>
