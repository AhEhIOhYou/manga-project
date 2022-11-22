<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	export let bookId = 0;
	export let chapterId = 0;

	let pageBack:number = 0;
	let pageNext:number = 2;
	
	const handleImgClick = (event) => {
		let bb: DOMRect = event.target.getBoundingClientRect();
		$page.url.searchParams.set('page', (event.clientX - bb.left > (bb.right - bb.left) / 2 ? pageNext :  pageBack).toString()); 
		goto(`?${$page.url.searchParams.toString()}`);
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
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="reader-body w-100 h-100 p-relative" on:mouseup={handleImgClick}>
		<div class="image-list m-auto">
			<div class="image-item p-relative">
				<div class="image-container w-100 h-100 p-relative">
					<img alt="альтухи" src="http://dummyimage.com/1080x1552/c0c0c0">
				</div>
			</div>
		</div>
	</div>
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