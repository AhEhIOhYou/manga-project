<script>
	import Cropper from 'svelte-easy-crop';
	import { getCroppedImg } from '@/lib/utils';

	import { createEventDispatcher, onDestroy } from 'svelte';

	const dispatch = createEventDispatcher();

	function reset() {
		croppedImage = null;
		crop = {
			x: 0,
			y: 0
		};
		zoom = 1;
	}

	export let image;
	let pixelCrop, croppedImage;
	let crop = {
		x: 0,
		y: 0
	};
	let zoom = 1;

	function changeCrop(e) {
		pixelCrop = e.detail.pixels;
	}

	async function cropImage() {
		croppedImage = await getCroppedImg(image, pixelCrop);
		dispatch('save', {
			img: croppedImage
		});
	}
</script>

<div class="p-relative" style="width: 450px; height: 600px">
	<Cropper
		{image}
		maxZoom={2}
		{zoom}
		{crop}
		cropSize={{ width: 250, height: 320 }}
		on:cropcomplete={changeCrop}
	/>
</div>
{#if croppedImage}
	<h2>Cropped Output</h2>
	<img src={croppedImage} alt="Cropped profile" /><br />
{:else}
	<br /><button type="button" on:click={async () => cropImage()}>Save</button>
{/if}
<button type="button" on:click={reset}>Reset</button>
