<script lang="ts">
	import type { FilterItemType, OrderByItemType } from '@/lib/server/domain/entities';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import ShowcaseTile from '../ShowcaseTile.svelte';
	import Filter from './Filter.svelte';
	import Search from './Search.svelte';
	import { goto } from '$app/navigation';

	let books = [];
	let error;

	let search: string = '';

	const orderBy: OrderByItemType = {
		by: 'title',
		order: 'desc'
	};

	const filter: Array<FilterItemType> = [	];

	async function findBooks() {
		if (search !== '') {
			$page.url.searchParams.set('s', search);
			goto(`?${$page.url.searchParams.toString()}`);
		} else {
			$page.url.searchParams.delete('s');
			goto(`?${$page.url.searchParams.toString()}`);
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
		}
		error = body.message;
	}

	onMount(async () => {
		if ($page.url.searchParams.get('s')) {
			search = $page.url.searchParams.get('s');
		}
		await findBooks();
	});

	let timerId;

	function handleInput(event) {
		clearTimeout(timerId);
		search = event.detail.value;
		timerId = setTimeout(() => findBooks(), 800);
	}
</script>

<div>
	<Search on:input={handleInput} />
	<Filter />
	{#if error}
		<p class="error">{error}</p>
	{/if}
	{#key books}
		<ShowcaseTile items={books} />
	{/key}
</div>

<style lang="scss">
</style>
