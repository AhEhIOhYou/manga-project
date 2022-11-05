<script lang="ts">
	import Carousel from '@/components/Carousel.svelte';
	const sliderData = {
		items: [
			{ cover: '', title: 'a', chapter: '' },
			{ cover: '', title: 'b', chapter: '' },
			{ cover: '', title: 'c', chapter: '' },
			{ cover: '', title: 'd', chapter: '' },
			{ cover: '', title: 'e', chapter: '' },
			{ cover: '', title: 'f', chapter: '' }
		]
	};
</script>

<svelte:head>
	<title>Welcome, ahehiohyou</title>
</svelte:head>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<Carousel items={sliderData.items} />
