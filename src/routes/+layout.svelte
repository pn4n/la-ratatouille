<script>
	import '../app.postcss';
	import { AppBar } from '@skeletonlabs/skeleton';
</script>

<main>
	<AppBar>
	<svelte:fragment slot="lead">
		<img src="/main-logo.png" alt="icon" width="44">
	</svelte:fragment>
	<p class="h2 font-light">La Ratatouille</p>
	<svelte:fragment slot="trail">(actions)</svelte:fragment>
	</AppBar>

	<div class="container card variant-glass-surface mt-10 p-3 mx-auto">
		<slot />
	</div>
</main>

<style>
	main {
		max-width: 1200px;
		margin: 0 auto;
	}
</style>