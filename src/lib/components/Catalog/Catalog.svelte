<script lang="ts">
	import type { FilterItemType, OrderByItemType } from '@/lib/server/domain/entities';
	import { onMount } from 'svelte';
	import ShowcaseTile from '../ShowcaseTile.svelte';
	import Filter from './Filter.svelte';
	import Search from './Search.svelte';

	let books = [];
	let error;

	let search: string = '';

	const orderBy: OrderByItemType = {
		by: 'title',
		order: 'desc'
	};

	const filter: Array<FilterItemType> = [];

	async function findBooks() {
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
