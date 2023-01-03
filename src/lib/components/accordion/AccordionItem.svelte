<script context="module" lang="ts">
	let current;
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	export let open = false;
	let item;

	function closeOthers() {
		if (current && current !== item) current.dispatchEvent(new CustomEvent('close'));
		open = !open;
		current = item;
	}

	onMount(() => {
		current = open ? item : current;
	});
</script>

<div class="accordion-item" class:open bind:this={item} on:close={() => (open = false)}>
	<button class="accordion-item-header" on:click={closeOthers}>
		<div class="accordion-item-title">
			<slot name="title" />
		</div>
		<div class="accordion-item-icon" />
	</button>
	{#if open}
		<div class="accordion-item-body" transition:slide={{ duration: 200 }}>
			<div class="accordion-item-content">
				<slot name="body" />
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.accordion-item {
		&:not(:last-child) {
			border-bottom: 1px solid var(--container-main-sub);
		}
		&.open {
			.accordion-item-header {
				.accordion-item-icon {
					transform: rotate(180deg);
				}
			}
		}
	}
	.accordion-item-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem;
		cursor: pointer;
		width: 100%;
	}
	.accordion-item-title {
		font-size: 1.2rem;
	}
	.accordion-item-icon {
		width: 1.5rem;
		height: 1.5rem;
		background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path fill="white" d="M16.59 15.41L12 10.83 7.41 15.41 6 14l6-6 6 6z"/></svg>');
		background-size: cover;
		transition: transform 0.3s ease;
	}
	.accordion-item-content {
		padding: 0 30px;
	}
</style>
