<script lang="ts">
	import Reader from '@/lib/shared/ui/reader/Reader.svelte';
	import Comments from '@/lib/components/comment/Comments.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	
</script>

<svelte:head>
	<title>Manga chapter page!</title>
</svelte:head>

<Reader pagesData={data}/>
<Comments bookId={1} chapterId={1}/>

<style lang="scss">
	
</style>