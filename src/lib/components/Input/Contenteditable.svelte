<script lang="ts">
	export let value = '';
</script>

<div
	class="comment-text p-relative"
	placeholder="write your comment here"
	contenteditable="plaintext-only"
	bind:innerHTML={value}
/>
