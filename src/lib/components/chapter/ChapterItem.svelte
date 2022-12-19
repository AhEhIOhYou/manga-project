<script lang="ts">
	import { page } from '$app/stores';
	import { DateTimeFormatter } from '@/lib/util_classes/DateTimeFormatter';
	export let chapterItemData;
	const createdAt = DateTimeFormatter.toDateString(chapterItemData.created_at);
</script>

<li class="chapters-list__item p-relative">
	<a
		class="chapters-list__link dp-flex jsc-space-between"
		href="{$page.url}/v{chapterItemData.volume}c{chapterItemData.number}"
	>
		<span class="chapter-item__title">
			Volume {chapterItemData.volume}
			Chapter {chapterItemData.number}
			<span class="chapter-item__subtitile">
				{chapterItemData.title}
			</span>
		</span>
		<span>
			{createdAt}
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
				.chapter-item__subtitile {
					font-size: 16px;
					color: var(--text-primary-sub);
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
