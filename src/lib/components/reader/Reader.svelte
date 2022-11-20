<script lang="ts">
	export let bookId = 0;
	export let chapterId = 0;
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
					Prev
				</a>
			</div>
			<div class="nav-next dp-i-block">
				<a class="btn next_page" href="#">
					Next
				</a>
			</div>
		</div>
	</div>
	<div class="reader-body w-100 h-100 p-relative">
		<div class="image-list m-auto">
			<div class="image-item p-relative">
				<div class="image-container w-100 h-100 p-relative">
					<img alt="альтухи" src="http://dummyimage.com/1080x1552/c0c0c0">
				</div>
			</div>
			<div class="image-item p-relative">
				<div class="image-container w-100 h-100 p-relative">
					<img alt="альтухи" src="http://dummyimage.com/1080x1552/c0c0c0">
				</div>
			</div>
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
		<div class="select-pagination">
			<div class="nav-prev dp-i-block">
				<a class="btn prev_page" href="#">
					Prev
				</a>
			</div>
			<div class="nav-next dp-i-block">
				<a class="btn next_page" href="#">
					Next
				</a>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.reader-menu {
		.select-pagination {
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