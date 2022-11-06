<script lang="ts">
	import Carousel from '@/components/Carousel.svelte';
	const sliderData = {
		items: [
			{
				cover: '',
				title: 'Test test fd',
				chapter: 'Глава 1',
				url: '/book/some-name/chapter-1'
			},
			{
				cover: 'http://dummyimage.com/170x250/c0c0c0',
				title: 'test test testtesttesttest testtesttest testtesttest',
				chapter: 'Глава 2',
				url: '/book/some-name/chapter-2'
			},
			{
				cover: 'http://dummyimage.com/170x250/c0c0c0',
				title: 'testtest',
				chapter: 'Глава 3',
				url: '/book/some-name/chapter-3'
			},
			{
				cover: 'http://dummyimage.com/170x250/c0c0c0',
				title: 'T e s t test',
				chapter: 'Глава 4',
				url: '/book/some-name/chapter-4'
			},
			{
				cover: 'http://dummyimage.com/170x250/c0c0c0',
				title: 'g',
				chapter: 'Глава 5',
				url: '/book/some-name/chapter-5'
			}
		]
	};
</script>

<svelte:head>
	<title>Welcome, ahehiohyou</title>
</svelte:head>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<Carousel items={sliderData.items} />
