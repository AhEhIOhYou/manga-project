<script lang="ts">
	export let bookData;
</script>

<svelte:head>
	<title>{bookData.title}</title>
</svelte:head>

<div class="container">
	<div class="manga-detail__cover dp-i-block v-top bg-cover bg-center p-relative">
		<img class="w-100" alt={bookData.title} src={bookData.cover} />
	</div>
	<div class="manga-detail__info dp-i-block p-relative v-top">
		<div class="manga-title-container">
			<div class="manga-title__main">
				{bookData.title}
			</div>
			<div class="manga-title__alt">
				{bookData.alt_title}
			</div>
		</div>
		<div class="manga-description">
			<span>{bookData.description}</span>
		</div>
		<div class="manga-rating dp-flex">
			<span>
				<svg width="40" height="40">
					<circle cx="20" cy="20" r="15" fill="yellow" />
				</svg>
			</span>
			<span>
				<svg width="40" height="40">
					<circle cx="20" cy="20" r="15" fill="yellow" />
				</svg>
			</span>
			<span>
				<svg width="40" height="40">
					<circle cx="20" cy="20" r="15" fill="yellow" />
				</svg>
			</span>
			<span>
				<svg width="40" height="40">
					<circle cx="20" cy="20" r="15" fill="yellow" />
				</svg>
			</span>
			<span>
				<svg width="40" height="40">
					<circle cx="20" cy="20" r="15" fill="yellow" />
				</svg>
			</span>
		</div>
		<div class="manga-data">
			<div class="manga-data__element dp-flex">
				<div class="manga-data__header">Author:</div>
				<div class="manga-data__content">{bookData.author}</div>
			</div>
			<div class="manga-data__element dp-flex">
				<div class="manga-data__header">Release:</div>
				<div class="manga-data__content">{bookData.release_date}</div>
			</div>
			<div class="manga-data__element dp-flex">
				<div class="manga-data__header">Type:</div>
				<div class="manga-data__content">{bookData.type}</div>
			</div>
			<div class="manga-data__element dp-flex">
				<div class="manga-data__header">Upload by:</div>
				<div class="manga-data__content">
					{bookData.loader_user_id}
					{bookData.created_at}
				</div>
			</div>
			<!-- <div class="manga-data__element dp-flex">
			<div class="manga-data__content  mtb-10">
				{#each bookData.tags as tag}
					<a class="manga-data__tag" href="#">{tag}</a>
				{/each}
			</div>
		</div> -->
		</div>
	</div>
</div>

<style lang="scss">

	.manga-detail__image {
		width: 250px;
		height: 320px;
		background-color: #e7e7e7;
		background-size: auto;
		background-origin: center;
		background-repeat: no-repeat;
	}

	.manga-detail__info {
		width: calc(100% - 260px);
		min-height: 320px;
		padding-left: 30px;
	}

	.manga-title-container {
		position: relative;
	}

	.manga-title__main {
		margin: 0 0 11px;
		font-size: 30px;
		font-weight: 400;
	}

	.manga-title__alt {
		color: var(--text-primaty-sub);
		margin: 0 0 11px;
		font-size: 25px;
		font-weight: 400;
	}

	.manga-data__element {
		margin: 10px 0;
	}

	.manga-data__header {
		width: 140px;
		font-weight: bold;
	}

	.manga-data__tag {
		background-color: #b3b3b3;
		padding: 5px 10px;
		margin: 5px;
		line-height: 14px;
	}
</style>
