<script lang="ts">
	import type { PageData } from './$types';
	import Comments from "@/lib/components/comment/Comments.svelte";
	import Book from "@/lib/components/book/Book.svelte";

	export let data: PageData;
</script>

<Book bookId={1} />
<Comments bookId={1} />
