<script lang="ts">
	import Header from '@/lib/components/Header.svelte';
	import Footer from '@/lib/components/Footer.svelte';

	import '../styles/styles.scss';
</script>

<Header />
<main class="size-ruler 3 p-relative">
	<slot />
</main>
<Footer />

<style lang="scss">
	.size-ruler {
		width: 1160px;
		margin: 70px auto 60px;
		border-radius: 2px;
		min-height: calc(100vh - 228px);
	}
</style>
