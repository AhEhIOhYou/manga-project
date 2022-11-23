<script lang="ts">
	import type { PageServerData } from './$types';
	import Comments from "@/lib/components/comment/Comments.svelte";
	import Book from "@/lib/shared/ui/book/Book.svelte";
	import ChaptersList from '@/lib/components/chapter/ChaptersList.svelte';

	export let data: PageServerData;
</script>

<Book bookData={data.bookInfo} />
<ChaptersList bookId={1} />
<Comments bookId={1} />
