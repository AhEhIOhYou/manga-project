<script lang="ts">
	import Button from '@/lib/components/Button.svelte';
	import ShowcaseTile from '@/lib/components/ShowcaseTile.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	const title: string = data.user ? data.user.name : 'master';
</script>

<svelte:head>
	<title>Welcome home, {title}!</title>
</svelte:head>

<div class="container">
	<div class="title">Test Page</div>
	<ShowcaseTile items={data.books}/>
	<Button type="btn">
		<a href="/book/create">Create book</a>
	</Button>
</div>
