<script lang="ts">
	import { fade } from 'svelte/transition';
	import { quartIn } from 'svelte/easing';
	import { onMount } from 'svelte';

	export let items = [];
	let ready = false;
	let showEmpty = false;

	onMount(() => {
		ready = true;
		if (items.length === 0) showEmpty = true;
	});
</script>

{#if ready}
	<div class="tile-list">
		{#each items as item, i}
			<div class="tile-item" in:fade={{ delay: 100 * i, easing: quartIn }}>
				<a href={item.link_title}>
					<img src={item.cover} alt="img" />
					<div class="title">{item.title}</div>
				</a>
			</div>
		{/each}
	</div>
	{#if showEmpty}
		<div class="info" in:fade={{ delay: 100, easing: quartIn }}>Nothing was found</div>
	{/if}
{/if}

<style lang="scss">
	.tile-list {
		display: grid;
		grid-gap: 5px;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		grid-auto-rows: 330px;

		.tile-item {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 2em;
			color: #20263f;
			overflow: hidden;
			transition: all 0.2s ease-in-out;

			img {
				width: 250px;
				height: 330px;
				object-fit: cover;
				border-radius: 3px;
			}

			.title {
				position: absolute;
				bottom: 0;
				margin: 0;
				padding: 10px 10px;
				max-height: 50%;
				width: 100%;
				opacity: 0;
				transition: all 0.2s ease-in-out;
				color: var(--white);
				font-size: 1.3rem;
				background: linear-gradient(0deg, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0) 100%);
				text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
				word-break: break-word;
				border-radius: 3px;

				@media (max-width: 1200px) {
					opacity: 1;
				}
			}

			@media (min-width: 1200px) {
				&:hover .title {
					opacity: 1;
				}

				&:hover {
					transform: translateY(-5px);
				}
			}
		}
	}
</style>
