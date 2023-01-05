<script lang="ts">
	import type { FilterItemType, OrderByItemType } from '@/lib/server/domain/entities';
	import { onMount } from 'svelte';
	import ShowcaseTile from '../ShowcaseTile.svelte';
	import Filter from './Filter.svelte';
	import Search from './Search.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import AccordionItem from '../Accordion/AccordionItem.svelte';

	let books = [];
	let error;
	let search: string = '';

	onMount(async () => {
		await findBooks();
	});

	const orderBy: OrderByItemType = {
		by: 'title',
		order: 'asc'
	};

	const filter: Array<FilterItemType> = [
		// {
		// 	name: 'release_year',
		// 	gt: 2018,
		// 	logic_group: 'AND',
		// },
		{
			name: 'release_year',
			gte: 2019,
			logic_group: 'NOT'
		}
	];

	async function findBooks() {
		if (search == '') {
			$page.url.searchParams.delete('search');
		} else {
			$page.url.searchParams.set('search', search);
		}

		const response = await fetch('/api/method/book.find', {
			method: 'POST',
			body: JSON.stringify({
				search,
				orderBy,
				filter
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const body = await response.json();
		if (response.ok) {
			books = body;
			goto($page.url.href, { replaceState: true, noscroll: true, keepfocus: true });
		}
		error = body.message;
	}

	let timerId;

	function handleInput(event) {
		clearTimeout(timerId);
		search = event.detail.value;
		timerId = setTimeout(() => findBooks(), 800);
	}
</script>

<div>
	<AccordionItem>
		<div slot="title">Filter</div>
		<p slot="body">
			<Filter />
		</p>
	</AccordionItem>
	<Search on:input={handleInput} bind:value={search} />
	{#if error}
		<p class="error">{error}</p>
	{/if}
	{#key books}
		<ShowcaseTile items={books} />
	{/key}
</div>

<style lang="scss">
</style>
