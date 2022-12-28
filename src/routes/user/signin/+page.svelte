<script lang="ts">
	import type { PageData } from '../sign-in/$types';
	import SignInForm from '@/lib/components/Form/SignInForm.svelte';
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
			location.href = '/';
		}
		error = body.message;
	}
</script>

<div class="container">
	<div class="title">Sign In</div>
	{#if error}
		<p class="error">{error}</p>
	{/if}
	<div class="size-ruler">
		<SignInForm on:submit={handleSubmit} />
	</div>
</div>

<style lang="scss">
	.size-ruler {
		margin: 0 auto;
		width: 20rem;
	}
</style>
