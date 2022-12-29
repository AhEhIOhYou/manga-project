<script lang="ts">
	import Button from './Button.svelte';
	import Select from './Input/Select.svelte';

	export let readerData;

	const viewOptions = [
		{ id: 1, text: 'List style' },
		{ id: 2, text: 'Page style' }
	];

	const prevChapterUrl =
		'/' +
		readerData.book_link_title +
		(readerData.nav_info.prev
			? `/v${readerData.nav_info.prev.volume}c${readerData.nav_info.prev.number}`
			: '');
	const nextChapterUrl =
		'/' +
		readerData.book_link_title +
		(readerData.nav_info.next
			? `/v${readerData.nav_info.next.volume}c${readerData.nav_info.next.number}`
			: '');

	const navItems = [
		{ label: 'Prev Chapter', url: prevChapterUrl },
		{ label: 'Next Chapter', url: nextChapterUrl }
	];

	const handleImgClick = (event) => {
		const pos: number = event.offsetX < event.target.width / 2 ? -1 : 1;
		if (pos == 1) {
			console.log('next page');
			// goto(pagesData.pageNextUrl);
		} else {
			console.log('prev page');
			// goto(pagesData.pageBackUrl);
		}
	};

	let scrollY: number = 0;
	let scrollYtmp: number = 0;
	let inactive;
	$: {
		inactive = scrollY > scrollYtmp;
		scrollYtmp = scrollY;
	}
</script>

<svelte:window bind:scrollY />

<div class="container reader">
	<div class="reader-menu" class:inactive>
		<div class="reader-menu__left">
			<Select id="view" name="view" options={viewOptions} />
		</div>
		<div class="reader-menu__center">
			<div class="select-pagination">
				{#each navItems as item}
					<Button>
						<a class="button" href={item.url}> {item.label} </a>
					</Button>
				{/each}
			</div>
		</div>
		<div class="reader-menu__right">
			<Button>
				<a class="button" href="#"> Chapters </a>
			</Button>
		</div>
	</div>
	<div class="reader-content">
		{#each readerData.pages as page}
			<div class="content-wrap">
				<img alt="Book page" class="content-image" src={page.url} on:click={handleImgClick} />
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.reader {
		position: relative;

		.reader-menu {
			background-color: var(--container-main-sub);
			bottom: 0;
			box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
			display: flex;
			justify-content: space-between;
			left: 0;
			padding: 2px 10px;
			position: fixed;
			right: 0;
			z-index: 1;
			transition-duration: 0.3s;

			&.inactive {
				transform: translateY(100%);
			}

			&__left {
				display: flex;
				align-items: center;
			}

			&__center {
				.select-pagination {
					display: flex;
					align-items: center;
					justify-content: center;
					gap: 10px;
				}
				display: flex;
				align-items: center;
			}

			&__right {
				display: flex;
				align-items: center;
			}
		}

		.reader-content {
			display: flex;
			flex-direction: column;
			align-items: center;

			.content-wrap {
				width: 100%;

				.content-image {
					width: inherit;
				}
			}
		}
	}
</style>
