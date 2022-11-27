<script lang="ts">
	import { goto } from '$app/navigation';

	export let pagesData;
	
	const handleImgClick = (event) => {
		const pos:number = event.offsetX < (event.target.width / 2) ? -1 : 1;
		if (pos == 1) {
			goto(pagesData.pageNextUrl);
		} else {
			goto(pagesData.pageBackUrl);
		}
	}
</script>

<div class="container">
	<div class="reader-menu dp-flex jsc-space-between mtb-10">
		<div class="select-view">
			<div class="select-chapter dp-i-block">
				<div class="dp-i-block">
					<a class="btn" href="#">
						Select chapter
					</a>
				</div>
			</div>
			<div class="select-pagestyle dp-i-block">
				<select>
					<option>
						List style
					</option>
					<option>
						Page style
					</option>
				</select>
			</div>
		</div>
		<div class="select-pagination">
			<div class="nav-prev dp-i-block">
				<a class="btn prev_page" href="#">
					Prev Chapter
				</a>
			</div>
			<div class="nav-next dp-i-block">
				<a class="btn next_page" href="#">
					Next Chapter
				</a>
			</div>
		</div>
	</div>
	{#each pagesData.pages as page}
		<div class="reader-body w-100 h-100 p-relative" on:mouseup={handleImgClick}>
			<div class="image-list m-auto">
				<div class="image-item p-relative">
					<div class="image-container w-100 h-100 p-relative">
						<img alt="альтухи" src="{page.url}">
					</div>
				</div>
			</div>
		</div>
	{/each}
	<div class="reader-menu dp-flex jsc-space-between mtb-10">
		<div class="select-view">
			<div class="select-chapter dp-i-block">
				<div class="dp-i-block">
					<a class="btn" href="#">
						Select chapter
					</a>
				</div>
			</div>
			<div class="select-pagestyle dp-i-block">
				<select>
					<option>
						List style
					</option>
					<option>
						Page style
					</option>
				</select>
			</div>
		</div>
		<div class="chapter-pagination">
			<div class="nav-prev dp-i-block">
				<a class="btn prev_chapter" href="#">
					Prev Chapter
				</a>
			</div>
			<div class="nav-next dp-i-block">
				<a class="btn next_chapter" href="#">
					Next Chapter
				</a>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.reader-menu {
		.page-pagination {
			position: fixed;
			top: 100px;

		}
		.chapter-pagination {
			.nav-prev {
				.prev_page {
					
				}
			}
		}
	}
	.reader-body {
		.image-list {
			overflow: hidden;

			.image-item {
				width: 100%;
				cursor: pointer;

				.loaded {
					min-width: auto!important;
					min-height: auto!important;
				}

				.image-container {

				}
			}
		}
	}
</style>