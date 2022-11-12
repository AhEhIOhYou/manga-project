<script lang="ts">
	import type { PageData } from './$types';
	import Manga from '@/lib/components/Manga.svelte';
	import Comments from '@/lib/components/comment/Comments.svelte';

	export let data: PageData;
</script>

<Manga />
<Comments bookId={5} />
