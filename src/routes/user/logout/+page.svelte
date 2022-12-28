<script lang="ts">
	import { onMount } from 'svelte';

	onMount(async () => {
		const res = await fetch('/api/method/user.logout');
		if (res.ok) {
			location.href = '/';
		}
	});
</script>
