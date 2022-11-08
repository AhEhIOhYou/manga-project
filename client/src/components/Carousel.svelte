<script lang="ts">
	import Page from '@/routes/+page.svelte';
	import { clipText } from '@/lib/utils';

	// Props
	export let items: Array<any> = [...Array(10).keys()];
	let scrollBy: number = 1;

	const paginationFactor: number = 170;
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
			offset = 170;
			active = 0;
		} else if (atStart) {
			offset = paginationFactor * (items.length - 1 - scrollBy) * -1;
			active = items.length - 1;
		}
	};
</script>

<div class="carousel-wrapper dp-flex">
	<div class="nav">
		<button class="left" on:click={() => move(-1)} />
	</div>
	<div class="carousel">
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
	</div>
	<div class="nav">
		<button class="right" on:click={() => move(1)} />
	</div>
</div>

<style lang="scss">
	.carousel-wrapper {
		justify-content: center;
		width: 620px;

		.nav {
			display: flex;
			flex-direction: column;
			justify-content: center;
		}

		button {
			display: inline-block;
			width: 4em;
			height: 4em;
			border: none;
			background: #36c148;
			border-radius: 50%;

			&:hover {
				background-color: #d6f3af;
				cursor: pointer;
			}

			&.left:after {
				content: '';
				display: inline-block;
				margin-top: 0.4em;
				margin-left: 0.6em;
				width: 1.4em;
				height: 1.4em;
				border-top: 0.2em solid white;
				border-right: 0.2em solid white;
				-moz-transform: rotate(-135deg);
				-webkit-transform: rotate(-135deg);
				transform: rotate(-135deg);
			}

			&.right:after {
				content: '';
				display: inline-block;
				margin-top: 0.4em;
				margin-left: -0.6em;
				width: 1.4em;
				height: 1.4em;
				border-top: 0.2em solid white;
				border-right: 0.2em solid white;
				-moz-transform: rotate(45deg);
				-webkit-transform: rotate(45deg);
				transform: rotate(45deg);
			}
		}

		.carousel {
			width: 510px;
			overflow: hidden;

			&::-webkit-scrollbar {
				display: none;
			}

			.items {
				display: flex;
				transition: transform 0.4s ease-in-out;
				transform: translateX(0px);

				.item {
					min-width: 170px;
					height: 250px;
					// margin: 0 4px;
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
						background: linear-gradient(0deg, black, 85%, rgba(255, 255, 255, 0));
					}

					.item__info__title {
						padding-top: 5px;
					}
				}
			}
		}
	}
</style>
