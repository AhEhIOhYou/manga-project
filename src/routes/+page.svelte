<script lang="ts">
	import Button from '@/lib/components/Button.svelte';
	import ShowcaseTile from '@/lib/components/ShowcaseTile.svelte';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	export let data: PageData;
	const title: string = data.user ? data.user.name : 'master';

	let ready = false;
	onMount(() => (ready = true));
</script>

<svelte:head>
	<title>Welcome home, {title}!</title>
</svelte:head>

{#if ready}
	<div
		class="container"
		in:fly={{
			y: 30,
			delay: 70 * 1,
			easing: cubicOut
		}}
	>
		<div class="title">Main Page</div>
		<ShowcaseTile items={data.books} />
		<Button type="btn">
			<a href="/book/create">Create book</a>
		</Button>
		<Button type="btn">
			<a href="/author/create">Create Author</a>
		</Button>
		<Button type="btn">
			<a href="/translation-team/create">Create Translation Team</a>
		</Button>
		<Button type="btn">
			<a href="/translation-team/list">List Translation Team</a>
		</Button>
		<Button type="btn">
			<a href="/genre/create">Create Genre</a>
		</Button>
		<Button type="btn">
			<a href="/genre/list">List Genre</a>
		</Button>
	</div>
{/if}
