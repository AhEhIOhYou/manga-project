<script lang="ts">
	import Input from '../Input/Input.svelte';
	import Button from '../Button.svelte';
	import { createEventDispatcher } from 'svelte';
	import FileInput from '../Input/FileInput.svelte';

	let username = '';
	let email = '';
	let password = '';
	let confirmPassword = '';
	let fileImg = [];
	let error;
	let confirmPasswordInputRef;
	let validFileTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
	const fileCategory = 'avatars';
	
	const dispatch = createEventDispatcher();
	function handleSubmit() {
		error = null;
		if (password !== confirmPassword) {
			error = 'Passwords do not match.';
			confirmPasswordInputRef.focus();
			return;
		}
		const avatar = fileImg ? fileImg[0] : null;
		dispatch('submit', {
			username,
			avatar,
			email,
			password
		});
	}
</script>

{#if error}
	<p class="error">{error}</p>
{/if}
<form class="form" on:submit|preventDefault={handleSubmit}>
	<Input
		label="Username"
		id="username"
		name="username"
		type="text"
		required
		bind:value={username}
	/>
	<div class="full-width">
		<FileInput
			{fileCategory}
			{validFileTypes}
			bind:fileList={fileImg}
			label="Avatar"
			id="avatar"
			name="avatar"
		/>
	</div>
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