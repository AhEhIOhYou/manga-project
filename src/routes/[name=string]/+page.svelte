<script lang="ts">
	import type { PageServerData } from './$types';
	// import Comments from "@/lib/components/comment/Comments.svelte";
	import Book from '@/lib/components/Book.svelte';
	import ChaptersList from '@/lib/components/chapter/ChaptersList.svelte';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	export let data: PageServerData;

	let ready = false;
	onMount(() => (ready = true));
</script>

{#if ready}
	<div
		in:fly={{
			y: 30,
			delay: 70 * 1,
			easing: cubicOut
		}}
	>
		<Book bookData={data.bookInfo} />
	</div>

	<div
	in:fly={{
		y: 30,
		delay: 70 * 2,
		easing: cubicOut
	}}
>
	<ChaptersList chaptersData={data.chaptersInfo} showAll={false} />
</div>
	<!-- <Comments bookId={1} /> -->
{/if}
