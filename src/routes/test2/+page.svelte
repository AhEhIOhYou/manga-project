<script lang="ts">
	import type { PageData } from '../api/test2/$types';
	import CreateComment from '@/lib/components/Comment/CreateComment.svelte';

	export let data: PageData;
	async function handleSubmit({detail: { message }}) {
		console.log(message);
	}
</script>

<div class="container">
	<div class="title">Test 2</div>
	<CreateComment user='' on:submit={handleSubmit} />
</div>
