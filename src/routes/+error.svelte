<script lang="ts">
	import { page } from '$app/stores';
</script>

<h1 class="page-error p-absolute">{$page.status}: {$page.error?.message}</h1>

<style lang="scss">
	.page-error {
		top: 50%;
		left: 50%;
		margin-right: -50%;
		transform: translate(-50%, -50%);
	}
</style>