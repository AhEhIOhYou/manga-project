<script lang="ts">
    import type { PageData } from './$types';
    import Manga from '@/components/Manga.svelte';
    import Comments from '@/components/Comments.svelte';
    
    export let data: PageData;
</script>

<svelte:head>
    <title>Manga page!</title>
</svelte:head>

<Manga />
<Comments />