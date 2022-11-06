<svelte:head>
	<title>Wellcum!</title>
</svelte:head>

<header class="global-header">
	<nav class="navbar">
		<div class="navbar__item title">My Best App</div>
		<a class="navbar__item" href="/">Home</a>
		<a class="navbar__item" href="/about">About</a>
		<a class="navbar__item" href="/cat-facts">Cat Facts</a>
		<a class="navbar__item" href="/test">Test</a>
		<a class="navbar__item" href="/login">Login</a>
	</nav>
</header>

<style lang="scss">
	.global-header {
		background-color: #313131;
		height: 56px;
		color: white;
		padding: 15px;
		box-sizing: border-box;

		.navbar {
			display: flex;
			align-items: center;
			height: 100%;

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
