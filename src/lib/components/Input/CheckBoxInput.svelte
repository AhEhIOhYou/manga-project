<script lang="ts">
	export let selected = [];
	export let id;
	export let label = '';
	export let name;
	export let data = [];
</script>

{#if label}
	<label for={id} class="input-label">{label}</label>
{/if}
<div class="genre-list">
	{#each data as item}
		<div class="checkbox-wrapper-4">
			<input class="inp-cbx" id={item.id} type="checkbox" bind:group={selected} value={item.id} />
			<label class="cbx" for={item.id}
				><span>
					<svg width="12px" height="10px">
						<use xlink:href="#check-4" />
					</svg></span
				><span>{item.name}</span></label
			>
			<svg class="inline-svg">
				<symbol id="check-4" viewbox="0 0 12 10">
					<polyline points="1.5 6 4.5 9 10.5 1" />
				</symbol>
			</svg>
		</div>
	{/each}
</div>

<style lang="scss">
	.genre-list {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 10px;
		padding: 1em;

		@media (max-width: 600px) {
			grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
		}

		.checkbox-wrapper-4 {
			.cbx {
				-webkit-user-select: none;
				user-select: none;
				cursor: pointer;
				padding: 6px 8px;
				border-radius: 6px;
				overflow: hidden;
				transition: all 0.2s ease;
				display: inline-block;

				&:not(:last-child) {
					margin-right: 6px;
				}

				span {
					float: left;
					vertical-align: middle;
					transform: translate3d(0, 0, 0);

					&:first-child {
						position: relative;
						width: 18px;
						height: 18px;
						border-radius: 4px;
						transform: scale(1);
						border: 1px solid #cccfdb;
						transition: all 0.2s ease;
						box-shadow: 0 1px 1px rgba(0, 16, 75, 0.05);
					}
					&:first-child svg {
						position: absolute;
						top: 3px;
						left: 2px;
						fill: none;
						stroke: #fff;
						stroke-width: 2;
						stroke-linecap: round;
						stroke-linejoin: round;
						stroke-dasharray: 16px;
						stroke-dashoffset: 16px;
						transition: all 0.3s ease;
						transition-delay: 0.1s;
						transform: translate3d(0, 0, 0);
					}

					&:last-child {
						padding-left: 8px;
						line-height: 18px;
					}
				}

				&:hover span:first-child {
					border-color: var(--green-sub);
				}
			}

			.inp-cbx {
				position: absolute;
				visibility: hidden;

				&:checked + .cbx span:first-child {
					background: var(--green-sub);
					border-color: var(--green-sub);
					animation: wave-4 0.4s ease;

					svg {
						stroke-dashoffset: 0;
					}
				}
			}

			.inline-svg {
				position: absolute;
				width: 0;
				height: 0;
				pointer-events: none;
				user-select: none;
			}
		}

		@media screen and (max-width: 640px) {
			.checkbox-wrapper-4 .cbx {
				width: 100%;
				display: inline-block;
			}
		}
		@-moz-keyframes wave-4 {
			50% {
				transform: scale(0.9);
			}
		}
		@-webkit-keyframes wave-4 {
			50% {
				transform: scale(0.9);
			}
		}
		@-o-keyframes wave-4 {
			50% {
				transform: scale(0.9);
			}
		}
		@keyframes wave-4 {
			50% {
				transform: scale(0.9);
			}
		}
	}
</style>
