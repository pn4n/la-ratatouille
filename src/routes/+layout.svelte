<script>
	import '../app.postcss';
	import { page } from '$app/stores';
	import { beforeNavigate } from '$app/navigation';

	import Footer from '$lib/components/Footer.svelte';
	import OrderForm from '$lib/components/OrderForm.svelte';
	import ModalList from '$lib/components/ModalList.svelte';
	
	import { AppShell ,
			 AppBar ,
			 Drawer ,
			 Toast } from '@skeletonlabs/skeleton';
	import { initializeStores, getToastStore } from '@skeletonlabs/skeleton';
	import { Modal, getModalStore } from '@skeletonlabs/skeleton';

	initializeStores();	
	const toastStore = getToastStore();
	const modalStore = getModalStore();

	const modalComponent = { ref: ModalList };

	const modal = {
		type: 'component',
		component: modalComponent,
	};
											
    let user = $page.data.user;

	let nav_items = [
		{ link: '/menu', title: 'Menu' },

		{ link: '/#book', title: 'Reserve' },

		{ link: '/account', title: 'Account' }
	];
	// let top;
	beforeNavigate(() => document.getElementById('page')?.scrollTo(0, 0));

</script>
<Modal/>
<Toast rounded='rounded-none'/>

<Drawer>
	<OrderForm bind:user/>
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
					<div class="space-x-0 hidden md:block">
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
					<div class="space-x-0 md:hidden block" >
					<button on:click={() => modalStore.trigger(modal)}>
					<img src="/svg/burger.svg" alt="icon" class="w-10">
					</button>
						
						<!-- {#each nav_items as route}
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
						{/each} -->
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
