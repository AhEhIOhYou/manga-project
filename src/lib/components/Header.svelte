<script lang="ts">
	import { invalidateAll, goto } from '$app/navigation';
	import { page } from '$app/stores';

	$: navigation = [
		{
			href: '/',
			name: 'Home'
		},
		{
			href: '/test2',
			name: `${$page.data.user ? $page.data.user.name : '🔒'} Test-2`
		}
	];

	async function handleSignOut() {
		await fetch('/api/method/user.logout');
		invalidateAll();
		goto('/');
	}
</script>

<header class="global-header w-100 p-fixed p-zero">
	<nav class="size-ruler dp-flex align-center h-100 m-auto">
		<a class="navbar__item title" href="/">
			<span> Manga Project </span>
		</a>
		{#each navigation as link}
			<a href={link.href} class="navbar__item">
				<span>{link.name}</span>
			</a>
		{/each}
		<div class="navbar__item">
			<input type="text" />
			<button>Search</button>
		</div>
		{#if $page.data.user}
			<button on:click={handleSignOut} class="btn"> Sign out </button>
		{:else}
			<a href="/user/sign-in" class="navbar__item"> Sign in </a>
			<a href="/user/sign-up" class="navbar__item"> Sign up </a>
		{/if}
	</nav>
</header>

<style lang="scss">
	.global-header {
		height: 50px;
		background-color: #3c3c3c;
		box-shadow: 0 0 5px 1px #26ff0080;
		z-index: 10;

		.size-ruler {
			max-width: 1160px;
			padding: 0 1.33333rem;

			.logo {
				height: 100%;
				margin-right: 5px;
			}

			.title {
				font-weight: bold;
			}

			.navbar__item {
				text-decoration: none;
				color: white;
			}

			.navbar__item:not(:last-child) {
				margin-right: 30px;
			}
		}
	}
</style>
