<script lang="ts">
	import Carousel from '@/lib/components/Carousel.svelte';
	const sliderData = {
		items: [
			{
				cover: '',
				title: 'Test test fd',
				chapter: 'Глава 1',
				url: '/some-name/c1'
			},
			{
				cover: 'http://dummyimage.com/170x250/c0c0c0',
				title: 'test test testtesttesttest testtesttest testtesttest',
				chapter: 'Глава 2',
				url: '/some-name/c22'
			},
			{
				cover: 'http://dummyimage.com/170x250/c0c0c0',
				title: 'testtest',
				chapter: 'Глава 3',
				url: '/some-name/c23'
			},
			{
				cover: 'http://dummyimage.com/170x250/c0c0c0',
				title: 'T e s t test',
				chapter: 'Глава 4',
				url: '/some-name/c44'
			},
			{
				cover: 'http://dummyimage.com/170x250/c0c0c0',
				title: 'g',
				chapter: 'Глава 5',
				url: '/some-name/c67'
			}
		]
	};
</script>

<svelte:head>
	<title>Welcome, ahehiohyou</title>
</svelte:head>

<Carousel items={sliderData.items} />
