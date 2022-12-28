<script lang="ts">
</script>

<footer class="footer">
	<div class="footer-wrapper">
		<div class="footer-container">
			<div class="footer-left">
				<div class="footer-logo">
					<img src="/favicon.png" alt="logo" />
				</div>
				<div class="footer-text">
					<p>© 2022 Bookshelf</p>
				</div>
			</div>
			<div class="footer-right">
				<div class="footer-links">
					<ul>
						<li>
							<a href="/about">About</a>
						</li>
						<li>
							<a href="/contact">Contact</a>
						</li>
						<li>
							<a href="/privacy">Privacy</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</footer>

<style lang="scss">
	.footer {
		padding: 30px 0 20px 0;
		background-color: var(--container-main);
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

		&-wrapper {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
		}

		&-container {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			max-width: 1200px;

			.footer-left {
				display: flex;
				align-items: center;
			}

			.footer-logo {
				width: 30px;
				height: 30px;
				margin-right: 10px;
			}

			.footer-right {
				display: flex;
				align-items: center;
			}

			.footer-links {
				display: flex;
			}

			.footer-links li {
				margin-right: 10px;
			}

			.footer-links li:last-child {
				margin-right: 0;
			}
		}
	}
</style>
