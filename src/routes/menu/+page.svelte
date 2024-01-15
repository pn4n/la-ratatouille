<script>
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import { getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();
	const drawerStore = getDrawerStore();

	import { show_notif, getTitle } from '$lib/utils';
	import { cart } from '$lib/stores/cart';
    import { fade } from "svelte/transition";
	import { ProgressBar } from '@skeletonlabs/skeleton';

	import MenuFooter from '$lib/components/MenuFooter.svelte';
	import MenuItem from '$lib/components/MenuItem.svelte';

	export let data;

	// export let form_status;
	
	// const trigger_toast = () => {
	// 	const t = {
	// 		message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
	// 		background: 'variant-filled-secondary',
	// 	};
	// 	toastStore.trigger(t);
	// 	// console.log('inside func', JSON.stringify(toastStore))
	// }
	let sum;
	$: sum = Object.values($cart)
		.reduce((total, item) => {
			return total + item.price * item.quantity;
		}, 0)
		.toFixed(2);

	// $: show_notif(form_status);

	const close_dialog = () => drawerStore.close();
</script>

<!-- <button class="btn" on:click={trigger_toast}>click</button> -->
<div transition:fade={{ duration: 300 }} class="pb-10">
{#await data.streamed}
	<div class="flex flex-col items-center space-y-5 font-light">
		<p class="text-2xl text-center text-tertiary-800">Please wait, we are loading the menu...</p>
		<ProgressBar
			value={undefined}
			meter="bg-secondary-500"
			track="bg-secondary-500/30"
			class="w-1/2"
		/>
	</div>
{:then dir}
<div>{JSON.stringify(dir.orders)}</div>
	{#each dir.menu_items as category}
		<h1 class="h2 text-primary-500 font-light text-5xl pl-3 pt-10 pb-3">
			{getTitle(category, 'en')}
		</h1>

		<div
			class="snap-x scroll-px-4 snap-mandatory scroll-smooth flex gap-4 overflow-x-auto px-4 pb-2 pt-4"
		>
			{#each category.items as item}
				<div class="snap-start shrink-0 card py-0 w-80 md:w-120 text-center">
					<MenuItem {item} url={dir.url} />
				</div>
			{/each}
		</div>
	{/each}

	{#if sum > 0}
	<MenuFooter bind:sum />
	{/if}
{:catch error}
	<p>{data.streamed.dir.error}</p>
	<p>{error.message}</p>
{/await}
</div>