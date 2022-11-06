<script lang="ts">
	import Page from '@/routes/+page.svelte';
	import { clipText } from '@/lib/utils';

	// Props
	export let items: Array<any> = [...Array(10).keys()];
	let scrollBy: number = 1;

	const paginationFactor: number = 175;
	const totalPaginationPixels: number = scrollBy * paginationFactor;

	let active: number = 1;
	let offset: number = 0;

	$: atStart = offset === paginationFactor;
	$: atEnd = offset <= paginationFactor * (items.length - 1 - scrollBy) * -1;

	const move = (direction: number) => {
		if (direction > 0 && !atEnd) {
			active++;
			offset -= totalPaginationPixels;
		} else if (direction < 0 && !atStart) {
			active--;
			offset += totalPaginationPixels;
		} else if (atEnd) {
			offset = 175;
			active = 0;
		} else if (atStart) {
			offset = paginationFactor * (items.length - 1 - scrollBy) * -1;
			active = items.length - 1;
		}
	};
</script>

<div class="book-carousel">
	<div class="items" style="transform: translateX({offset}px);">
		{#each items as item, i}
			<a
				href={item.url}
				class="item"
				class:active={active === i}
				style="background-image: url({item.cover}), linear-gradient(45deg, #6e9e2f, #d6f3af);"
			>
				<div class="item__info">
					<div class="item__info__chapter">
						{item.chapter}
					</div>
					<div class="item__info__title">
						{clipText(item.title)}
					</div>
				</div>
			</a>
		{/each}
	</div>
	<button on:click={() => move(-1)}>&lsaquo; Prev</button>
	<button on:click={() => move(1)}>Next &rsaquo;</button>
</div>

<style lang="scss">
	.book-carousel {
		width: 525px;
		overflow: hidden;

		.items {
			display: flex;
			transition: transform 0.4s ease-in-out;
			transform: translateX(0px);

			.item {
				min-width: 170px;
				height: 250px;
				margin: 0 4px;
				border-radius: 0.7rem;
				display: flex;
				justify-content: end;
				flex-direction: column;
				color: white;
				transform: scale(0.8);
				transition: transform ease 0.3s;
				overflow: hidden;
				&.active {
					transform: scale(1);
				}

				.item__info {
					max-height: 100px;
					min-height: 50px;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					padding: 10px;
					background: linear-gradient(0deg, black, 85%, rgba(255, 252, 252, 0));
				}

				.item__info__title {
					padding-top: 5px;
					text-overflow: clip;
				}
			}
		}
	}
</style>
