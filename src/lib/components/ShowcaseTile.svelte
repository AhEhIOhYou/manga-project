<script lang="ts">
	import { fly } from 'svelte/transition';
	import { quartIn } from 'svelte/easing';
	import { onMount } from 'svelte';

	export let items = [];
	let ready = false;
	onMount(() => (ready = true));
</script>

{#if ready}
	<div class="tile-list">
		{#each items as item, i}
				<div
					in:fly={{
						y: 50,
						delay: 70 * i,
						easing: quartIn
					}}
					class="tile-list__item"
				>
					<a href={item.link_title}>
						<img src={item.cover} alt="img" />
						<div class="tile-list__item__text">{item.title}</div>
					</a>
				</div>
		{/each}
	</div>
{/if}

<style lang="scss">
	.tile-list {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 5px;
		margin-top: 20px;

		@media (max-width: 1124px) {
			grid-template-columns: repeat(4, 1fr);
		}

		@media (max-width: 768px) {
			grid-template-columns: repeat(2, 1fr);
		}

		@media (max-width: 480px) {
			grid-template-columns: 1fr;
		}

		.tile-list__item {
			background-color: var(--white);
			border-radius: 3px;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
			overflow: hidden;
			transition: all 0.2s ease-in-out;
			position: relative;

			&:hover {
				transform: translateY(-5px);
			}

			.tile-list__item__text {
				position: absolute;
				bottom: 0;
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
			}

			&:hover .tile-list__item__text {
				opacity: 1;
			}

			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
	}
</style>
