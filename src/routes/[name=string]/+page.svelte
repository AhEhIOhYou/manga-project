<script lang="ts">
	import type { PageServerData } from './$types';
	// import Comments from "@/lib/components/comment/Comments.svelte";
	import Book from '@/lib/components/Book.svelte';
	import ChaptersList from '@/lib/components/chapter/ChaptersList.svelte';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import AccordionItem from '@/lib/components/accordion/AccordionItem.svelte';
	import BookDescription from '@/lib/components/BookDescription.svelte';

	export let data: PageServerData;	

	let ready = false;
	onMount(() => (ready = true));
</script>

{#if ready}
	<div
		in:fly={{
			y: -30,
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
		<div class="container">
			<div class="accordion">
				<AccordionItem open={true}>
					<div slot="title">Description</div>
					<p slot="body">
						<BookDescription bookData={data.bookInfo} />
					</p>
				</AccordionItem>
				<AccordionItem>
					<div slot="title">Chapters</div>
					<div slot="body">
						<ChaptersList chaptersData={data.chaptersInfo} showAll={false} />
					</div>
				</AccordionItem>
			</div>
		</div>
	</div>
	<!-- <Comments bookId={1} /> -->
{/if}

<style lang="scss">
	
</style>
