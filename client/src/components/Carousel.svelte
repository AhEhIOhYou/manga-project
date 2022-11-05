<script lang="ts">
	import Page from "@/routes/+page.svelte";



	// Props
	export let items: Array<any> = [...Array(10).keys()];
	let scrollBy = 1;

	const paginationFactor = 175;
	const totalPaginationPixels = scrollBy * paginationFactor;

	$: active = 1;
	$: offset = 0;
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
	}
</script>

<main>
	{active}
	<div class="items" style="transform: translateX({offset}px);">
		{#each items as item, i}
			<div class="item" class:active={active === i} style="background-color: hsla({i * 25}deg, 75%, 55%);">{item.title}</div>
		{/each}
	</div>
</main>

<button on:click={() => move(-1)}>&lsaquo; Prev</button>
<button on:click={() => move(1)}>Next &rsaquo;</button>

<div class="details">
	offset: {offset}px<br />
	atStart: {atStart}<br />
	atEnd: {atEnd}
</div>

<style lang="scss">
	main {
		width: 525px;
		overflow: hidden;
	}

	.items {
		display: flex;
		transition: transform 0.4s ease-in-out;
		transform: translateX(0px);
	}

	.item {
		min-width: 167px;
		height: 100px;
		margin: 0 4px;
		background-color: #ef4322;
		border-radius: 0.7rem;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: bold;
		font-size: 10rem;
		user-select: none;
		overflow: hidden;
		transform: scale(0.8);
		transition: transform ease .3s;
		&.active {
		transform: scale(1);

		}
	}

	.items .item:first-child {
		margin-left: 0;
	}

	.items .item:last-child {
		margin-right: 0;
	}

	.details {
		margin-top: 20px;
		font-style: italic;
		color: #9f9f9f;
	}
</style>
