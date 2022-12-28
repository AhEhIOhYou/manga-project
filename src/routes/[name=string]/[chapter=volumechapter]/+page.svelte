<script lang="ts">
	import Reader from '@/lib/components/Reader.svelte';
	import type { PageServerData } from './$types';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	let ready = false;
	onMount(() => (ready = true));

	export let data: PageServerData;
</script>

<svelte:head>
	<title>{data.readerData.title}</title>
</svelte:head>

{#key data.readerData}
	{#if ready}
		<div
			in:fly={{
				x: 50,
				duration: 600,
				easing: cubicOut
			}}
		>
			<Reader readerData={data.readerData} />
		</div>
	{/if}
{/key}
