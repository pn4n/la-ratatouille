<script>
	import '../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';
	import { AppBar } from '@skeletonlabs/skeleton';

	import Footer from '$lib/components/Footer.svelte';

	import { page } from '$app/stores';
	let nav_items = [
		{ link: '/menu', title: 'Menu' },

		{ link: '/#book', title: 'Reserve' },

		{ link: '/reviews', title: 'Account' }
	];
	// $: console.log($page.route.id);<script>
	import { Toasts } from 'svoast';

</script>
<Toasts position="bottom-center" />
<AppShell>
	<svelte:fragment slot="header">
		<div class="main">
			<AppBar background="bg-secondary-0" shadow="shadow-lg" class="rounded-none py-2 space-y-0">
				<svelte:fragment slot="lead">
					<img src="/main-logo.png" alt="icon" width="44" />
				</svelte:fragment>
				<a href="/" class="h2 font-light text-tertiary-800">La Ratatouille</a>
				<svelte:fragment slot="trail">
					<div class="space-x-0">
						{#each nav_items as route}
							{#if route.link === $page.route.id}
								<a
									href={route.link}
									class="btn variant-soft-tertiary text-primary-800 text-xl font-light rounded-none"
									>{route.title}</a
								>
							{:else}
								<a href={route.link} class="btn text-tertiary-800 text-xl font-light"
									>{route.title}</a
								>
							{/if}
						{/each}
					</div>
				</svelte:fragment>
			</AppBar>
		</div>
	</svelte:fragment>

	<div class="main">
		<div class="container pt-10 mx-auto rounded-none">
			<slot />
		</div>
	</div>

	<svelte:fragment slot="pageFooter">
		<Footer />
	</svelte:fragment>
</AppShell>

<style>
	.main {
		max-width: 1200px;
		margin: 0 auto;
	}
</style>
