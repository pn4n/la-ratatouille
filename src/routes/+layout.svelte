<script>
	import Footer from '$lib/components/Footer.svelte';

	import '../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { Drawer } from '@skeletonlabs/skeleton';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import { Toasts } from 'svoast';

	import { page } from '$app/stores';
	import { cart } from '$lib/stores/cart';

	initializeStores();

	let nav_items = [
		{ link: '/menu', title: 'Menu' },

		{ link: '/#book', title: 'Reserve' },

		{ link: '/reviews', title: 'Account' }
	];
	$: console.log($cart);

</script>
<Toasts position="bottom-center" />
<Drawer>
	

<div class="table-container">
	<!-- Native Table Element -->
	<table class="table table-hover">
		<thead>
			<tr>
				<th>Title</th>
				<th>Quantity</th>
				<th>Price</th>
				<th>Sum</th>
			</tr>
		</thead>
		<tbody>
			{#each Object.values($cart) as item (item.id)}
				<tr>

					<td>{ item.title }</td>
					<td>{ item.quantity }</td>
					<td>{ item.price}</td>
					<td>{ item.quantity * item.price }</td>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<th colspan="3">Calculated Total Weight</th>
				<td>SUM</td>
			</tr>
		</tfoot>
	</table>
	<!-- {JSON.stringify(item)}	 -->

</div>

</Drawer>
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
									class="btn variant-soft-tertiary text-xl font-light rounded-none"
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
