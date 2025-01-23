<script>
	import '../app.css';
	let { children } = $props();
</script>

<style>
	:root {
		--main-bg-color: rgb(11, 15, 23);
		--main-text-color: #ffffff;
	}

	:global(body) {
		background-color: var(--main-bg-color);
		color: var(--main-text-color);
	}
</style>

{@render children()}
