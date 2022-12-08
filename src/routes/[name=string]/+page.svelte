<script lang="ts">
	import type { PageServerData } from './$types';
	import Comments from "@/lib/components/comment/Comments.svelte";
	import Book from "@/lib/components/Book.svelte";
	import ChaptersList from '@/lib/components/chapter/ChaptersList.svelte';

	export let data: PageServerData;
</script>

<Book bookData={data.bookInfo} />
<ChaptersList chaptersData={data.chaptersInfo} showAll={false}/>
<!-- <Comments bookId={1} /> -->
