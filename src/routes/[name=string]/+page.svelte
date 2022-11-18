<script lang="ts">
	import type { PageData } from './$types';
	import Comments from "@/lib/components/comment/Comments.svelte";
	import Book from "@/lib/components/book/Book.svelte";
	import ChaptersList from '@/lib/components/book/ChaptersList.svelte';

	export let data: PageData;
</script>

<Book bookId={1} />
<ChaptersList bookId={1} />
<Comments bookId={1} />
