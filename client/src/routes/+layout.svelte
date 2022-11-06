<script lang="ts">
	import Header from '@/components/Header.svelte';
	import Footer from '@/components/Footer.svelte';
</script>

<Header />
<slot />
<Footer />

<style lang="scss">
	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
		height: 100%;
	}

	:global(body) {
		margin: 0;
		height: 100%;
		background-color: #fbfbfb;
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
</style>
