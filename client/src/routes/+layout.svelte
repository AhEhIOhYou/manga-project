<script lang="ts">
	import Header from '@/components/Header.svelte';
	import Footer from '@/components/Footer.svelte';
</script>

<Header />
<main class="main-content">
	<slot />
	<slot />
	<slot />
	<slot />
</main>
<Footer />

<style lang="scss">
	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
		height: 100%;
	}

	$bodyBGColor: #222;
	$mainBGColor: #333333;
	$mainTextColor: white;
	$headerBGColor: #FFA07A;
	$headerBGColorScroll: gray;
	$headerBGColorScrollOpacity: .2;
	$footerBGColor: #8B4513;
	$linkHover: #FF4500;
	$transitionDuration: .5s;
	$blockTextColor: gray;

	:global(body) {
		margin: 0;
		height: 100%;
		background-color: $bodyBGColor;
		color: $mainTextColor;
		flex-direction: column;
	}

	:global(.title) {
		position: relative;
	}

	:global(.title__text::before) {
		content: '';
		position: absolute;
		height: 2px;
		width: 100%;
		background-color: rgb(139, 139, 139);
		bottom: -5px;
		z-index: 1;
	}

	:global(a) {
		text-decoration: none;
		&:visited {
			color: $linkHover;
		}
	}

	.main-content {
		margin: 100px 20px 100px 20px;
		padding: 30px 100px 30px;
		background-color: $mainBGColor;
		border-radius: 0.6em;
		display: grid;
		justify-content: center;
	}

	:global(.m-auto) {
		margin: 0 auto;
	}
	:global(.dp-flex) {
		display: flex;
	}
	:global(.w-100) {
		width: 100%;
	}
	:global(.h-100) {
		height: 100%;
	}
	:global(.p-fixed) {
		position: fixed;
	}
	:global(.p-relative) {
		position: relative;
	}
	:global(.p-absolute) {
		position: absolute;
	}
	:global(.p-center, .p-zero) {
		top: 0;
		left: 0;
	}
	:global(.dp-flex.align-center) {
		align-items: center;
	}
</style>
