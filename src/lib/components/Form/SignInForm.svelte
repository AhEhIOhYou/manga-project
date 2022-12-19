<script>
	import Input from '../Input/Input.svelte';
	import Button from '../Button.svelte';
	import { createEventDispatcher } from 'svelte';	

	let login = '';
	let password = '';
	const dispatch = createEventDispatcher();
	function handleSubmit() {
		dispatch('submit', {
			login,
			password
		});
	}
</script>

<form class="form" on:submit|preventDefault={handleSubmit} >
	<Input
		label="Email or username"
		id="login"
		name="login"
		type="text"
		bind:value={login}
		required
	/>
	<Input
		label="Password"
		id="password"
		name="password"
		type="password"
		bind:value={password}
		required
	/>
	<Button type="submit">Sign In</Button>
</form>
