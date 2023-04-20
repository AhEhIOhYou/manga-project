<script lang="ts">
	import Button from './Button.svelte';
	import RangeInput from './Input/RangeInput.svelte';
	import Select from './Input/Select.svelte';

	export let readerData;

	let containerMaxWidthDefault: number = 1160;
	let containerMaxWidth: number = containerMaxWidthDefault;

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

<div class="reader">
	<div class="reader-sub">
		<div class="title">
			<p>Том {readerData.volume} Глава {readerData.number}</p>
			<p>{readerData.title}</p>
		</div>
		<div class="select-pagination">
			{#each navItems as item}
				<Button>
					<a class="button" href={item.url}> {item.label} </a>
				</Button>
			{/each}
		</div>
	</div>

	<div class="reader-main" style="max-width: {containerMaxWidth}px;">
		{#each readerData.pages as page}
			<div class="content-wrap">
				<img alt="Book page" class="content-image" src={page.url} on:click={handleImgClick} />
			</div>
		{/each}
	</div>
	<div class="reader-menu" class:inactive>
		<div class="reader-settings">
			<div class="settings__item">
				<RangeInput
					id="containerMaxWidth"
					label="Container width"
					name="containerMaxWidth"
					min={700}
					max={window.innerWidth}
					step={10}
					bind:value={containerMaxWidth}
				/>
			</div>
			<div class="settings__item">
				<Select id="view" label="View" name="view" options={viewOptions} />
			</div>
		</div>
		<div class="reader-menu__right">
			<Button>
				<a class="button" href="#"> Chapters </a>
			</Button>
		</div>
	</div>

	<div class="reader-sub">
		<div class="select-pagination">
			{#each navItems as item}
				<Button>
					<a class="button" href={item.url}> {item.label} </a>
				</Button>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.reader {
		margin-top: 70px;
		position: relative;
		display: flex;
		flex-direction: column;

		.reader-sub {
			background-color: var(--container-main);
			border-radius: 5px;
			margin: 10px auto;
			max-width: 1160px;
			width: 100%;
			padding: 20px;
		}

		.reader-main {
			background-color: var(--container-main);
			border-radius: 5px;
			margin: 0 auto;
			max-width: 1160px;
			padding: 20px;
		}

		.reader-settings {
			border: 2px solid red;
			display: flex;
			background-color: var(--container-main-sub);

			.settings__item {
				display: flex;
				align-items: center;
				gap: 10px;
				padding: 20px;
			}
		}

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

		.reader-main {


			.content-wrap {
				width: 100%;

				.content-image {
					width: inherit;
				}
			}
		}
	}
</style>
