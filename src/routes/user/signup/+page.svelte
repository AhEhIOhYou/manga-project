<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import type { UserType } from '@/lib/server/domain/entities';

	export let data: PageData;
	let errMessage: string = '';

	const handleSubmit = async (e) => {
		const formData = new FormData(e.target);
		const data: any = {};
		for (let field of formData) {
			const [key, value] = field;
			data[key] = value;
		}

		const createUserApiUrl = `/api/method/user.create`;

		const res = await fetch(createUserApiUrl, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: data.email,
				password: data.password,
				username: data.username
			})
		});
		if (res.ok) {
			goto('/');
		} else {
			res.json().then(err => errMessage = err.message);
		}
	};
</script>

<div class="container">
	<div class="title">Sign Up</div>
	<form class="form dp-flex fd-column align-center" on:submit|preventDefault={handleSubmit}>
		<div class="form__group field">
			<input
				type="text"
				class="form__field"
				placeholder="Title"
				autocomplete="off"
				name="username"
				id="username"
				required
			/>
			<label for="username" class="form__label">Username</label>
		</div>
		<div class="form__group field">
			<input
				type="email"
				class="form__field"
				placeholder="Title"
				autocomplete="off"
				name="email"
				id="email"
				required
			/>
			<label for="email" class="form__label">Email</label>
		</div>
		<div class="form__group field">
			<input
				type="password"
				class="form__field"
				placeholder="Title"
				autocomplete="off"
				name="password"
				id="password"
				required
			/>
			<label for="password" class="form__label">Password</label>
		</div>
		{#if errMessage}
			<div class="error">
				{errMessage}
			</div>
		{/if}
		<button class="btn" type="submit"> Create </button>
	</form>
</div>
