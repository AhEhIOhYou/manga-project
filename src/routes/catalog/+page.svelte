<script lang="ts">
	import Catalog from '@/lib/components/Catalog/Catalog.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container">
	<div class="title">Catalog</div>
	<Catalog />
</div>
