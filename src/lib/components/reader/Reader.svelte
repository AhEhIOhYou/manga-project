<script lang="ts">
	export let bookId = 0;
	export let chapterId = 0;
</script>

<div class="container">
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
</div>

<style lang="scss">
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