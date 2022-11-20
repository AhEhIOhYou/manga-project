<script lang="ts">
	export let chapterItemData;
</script>

<li class="chapters-list__item p-relative">
	<a class="chapters-list__link dp-flex jsc-space-between" href="/c{chapterItemData.number}">
		<span class="chapter-item__title">
			{chapterItemData.title}
			<span class="chapter-item__translator">
				{chapterItemData.translator}	
			</span>
		</span>
		<span>
			{chapterItemData.created_at}
		</span>
	</a>
</li>

<style lang="scss">
	.chapters-list__item {
		font-size: 18px;

		.chapters-list__link {
			padding: 10px;

			&:hover {
				background-color: var(--list-hover);
			}

			.chapter-item__title {
				.chapter-item__translator {
					font-size: 16px;
					color: var(--text-primaty-sub);
				}
			}
		}

		&:after {
			content: '';
			position: absolute;
			height: 1px;
			background-color: var(--list-hover);
			width: 100%;
			left: 0;
		}
	}
</style>
