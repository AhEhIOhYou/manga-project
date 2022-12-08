<script lang="ts">
	import Input from './Input/Input.svelte';
	import Button from './Button.svelte';
	import { createEventDispatcher } from 'svelte';

	let username = '';
	let email = '';
	let password = '';
	let confirmPassword = '';
	let error;
	let confirmPasswordInputRef;
	const dispatch = createEventDispatcher();
	function handleSubmit() {
		error = null;
		if (password !== confirmPassword) {
			error = 'Passwords do not match.';
			confirmPasswordInputRef.focus();
			return;
		}
		dispatch('submit', {
			username,
			email,
			password
		});
	}
</script>

{#if error}
	<p class="error">{error}</p>
{/if}
<form class="form dp-flex fd-column align-center" on:submit|preventDefault={handleSubmit}>
	<Input
		label="Username"
		id="username"
		name="username"
		type="text"
		required
		bind:value={username}
	/>
	<Input label="Email" id="email" name="email" type="email" required bind:value={email} />
	<Input label="Password" id="password" name="password" type="password" bind:value={password} />
	<Input
		label="Confirm Password"
		id="confirm-password"
		name="confirm-password"
		type="password"
		bind:value={confirmPassword}
		bind:inputRef={confirmPasswordInputRef}
	/>
	<Button type="submit">Sign Up</Button>
</form>