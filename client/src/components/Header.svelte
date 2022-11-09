<header class="global-header w-100 p-fixed p-zero">
	<nav class="size-ruler dp-flex align-center h-100 m-auto">
		<a class="navbar__item title" href="/">
			<span> Manga Projcet </span>
		</a>
		<a class="navbar__item" href="/"><span>Home</span></a>
		<a class="navbar__item" href="/genre"><span>Genre</span></a>
		<div class="navbar__item">
			<input type="text" />
			<button>Search</button>
		</div>
		<a class="navbar__item" href="/login"><span>Login/Signup</span></a>
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
