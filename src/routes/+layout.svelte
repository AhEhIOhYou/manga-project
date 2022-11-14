<script lang="ts">
	import Header from '@/lib/components/Header.svelte';
	import Footer from '@/lib/components/Footer.svelte';
</script>

<Header />
<main class="size-ruler 3 p-relative">
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
	$headerBGColor: #ffa07a;
	$headerBGColorScroll: gray;
	$headerBGColorScrollOpacity: 0.2;
	$footerBGColor: #8b4513;
	$linkHover: #ff4500;
	$transitionDuration: 0.5s;
	$blockTextColor: gray;

	:global(body) {
		margin: 0;
		height: 100%;
		background-color: $bodyBGColor;
		color: $mainTextColor;
		flex-direction: column;
	}

	:global(*, ::after, ::before) {
		box-sizing: border-box;
	}

	:global(.title) {
		margin: 0;
		font-size: 20px;
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
		color: white;
		&:visited {
			color: white;
		}
	}

	:global(input) {
		background: $mainBGColor;
		border: none;
		color: white;
	}

	:global([contenteditable='true']:empty:before) {
		content: attr(placeholder);
		display: block;
	}

	:global([contenteditable='true']:empty:focus:before) {
		content: '';
	}

	.size-ruler {
		width: 1160px;
		margin: 70px auto 60px;
		border-radius: 2px;
		min-height: calc(100vh - 228px);
	}

	:global(.m-auto) {
		margin: 0 auto;
	}
	:global(.dp-flex) {
		display: flex;
	}
	:global(.dp-grid) {
		display: grid;
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
	:global(.dp-flex.fd-row) {
		flex-direction: row;
	}
	:global(.dp-flex.fd-column) {
		flex-direction: column;
	}
	:global(.t-no-wrap, .t-nowrap) {
		white-space: nowrap;
	}
	:global(.b-radius-10) {
		border-radius: 10px;
	}
	:global(.v-top) {
		vertical-align: top;
	}
	:global(.dp-i-block) {
		display: inline-block;
	}
	:global(.bg-center) {
		background-position: 50%;
	}
	:global(.w-100) {
		width: 100%;
	}
	:global(.mtb-10) {
		margin: 10px 0;
	}
	:global(.mb-8) {
		margin-bottom: 8px;
	}
</style>
