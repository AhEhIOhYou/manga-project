<script lang="ts">
	import Header from '@/lib/components/Header.svelte';
	import Footer from '@/lib/components/Footer.svelte';

	import '../styles/styles.scss';
</script>

<Header />
<main>
	<div class="size-ruler">
		<slot />
	</div>
</main>
<Footer />

<style lang="scss">
	.size-ruler {
		position: relative;
		margin: 50px auto 60px;
		border-radius: 2px;
		min-height: calc(100vh - 228px);
	}
</style>
