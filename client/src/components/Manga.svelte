<script lang="ts">
	const bookData = {
		id: 1233,
		title: 'Фуфу',
		alt_title: 'Fufu',
		author: 'Heranuka Poroyalu',
		type: 'manga',
		cover: 'http://dummyimage.com/250x320/c0c0c0',
		description: 'Повседневная практика показывает, что дальнейшее развитие различных форм деятельности позволяет оценить значение соответствующий условий активизации. Таким образом начало повседневной работы по формированию позиции способствует подготовки и реализации существенных финансовых и административных условий. Идейные соображения высшего порядка, а также начало повседневной работы по формированию позиции в значительной степени обуславливает создание соответствующий условий активизации. Товарищи! сложившаяся структура организации играет важную роль в формировании существенных финансовых и административных условий.',
		release_date: '07.10.2022',
		loader_user: {
			id:12,
			name: 'Ayaya'
		},
		created_at: '07.10.2022',
		tags: [
			'tag-1',
			'tag2',
			'tag-3',
			'tag--4',
		],
		genres: [
			'genre1',
			'genre2',
			'genre3',
			'genre5',
		],
		chapters: [
			{
				id: 123,
				title: 'ououou',
				number: 1,
				translator: 'team bitard',
				book_id: 1233,
				loader_user_id: 1,
				created_at: '08.10.2022',
			},
			{
				id: 124,
				title: 'ouououwww',
				number: 2,
				translator: 'team bitard',
				book_id: 1233,
				loader_user_id: 1,
				created_at: '08.10.2022',
			},
			{
				id: 125,
				title: 'odduouou',
				number: 3,
				translator: 'team bitard',
				book_id: 1233,
				loader_user_id: 1,
				created_at: '08.10.2022',
			}
		]
	}
</script>

<svelte:head>
	<title>{bookData.title}</title>
</svelte:head>

<div class="manga-detail  b-radius-10 mtb-10">
	<div class="manga-detail__cover dp-i-block v-top bg-cover bg-center p-relative">
		<img class="w-100" alt="{bookData.title}" src="{bookData.cover}">
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
		<div class="manga-rating">	
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
					{bookData.loader_user.name}
					{bookData.created_at}
				</div>
			</div>
			<div class="manga-data__element dp-flex">
				<div class="manga-data__content  mtb-10">
					{#each bookData.tags as tag}
						<a class="manga-data__tag" href="#">{tag}</a>
					{/each}
				</div>
			</div>
			<div class="manga-data__element dp-flex">
				<div class="manga-data__content  mtb-10">
					{#each bookData.genres as genre}
						<a class="manga-data__tag" href="#">{genre}</a>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">

	$mainBGColor: #333333;
	$titleColor: white;
	$altTitleColor: #b3b3b3;


	.manga-detail {
		padding: 20px;
		background-color: $mainBGColor;
	}

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
		color:$altTitleColor;
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