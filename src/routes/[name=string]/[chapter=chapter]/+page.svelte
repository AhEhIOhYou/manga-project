<script lang="ts">
	import type { PageData } from './$types';
	import Reader from '@/lib/components/reader/Reader.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Manga chapter page!</title>
</svelte:head>

<Reader bookId={1} chapterId={1}/>


<style lang="scss">
	
</style>