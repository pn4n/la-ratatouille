<script lang="ts">
	// import type { SvelteComponent } from 'svelte';

	// import { ListBox, ListBoxItem, getModalStore } from '@skeletonlabs/skeleton';
    import { getModalStore } from '@skeletonlabs/skeleton';
	import { languageTag } from '$paraglide/runtime.js';

	// Props
	/** Exposes parent props to this component. */
	// export const parent='';

	const modalStore = getModalStore();

	// let nav_items = [
	// 	{ link: '/', title: 'Main page' },

	// 	{ link: '/menu', title: 'Menu' },

	// 	{ link: '/#book', title: 'Reserve' },

	// 	{ link: '/account', title: 'Account' }
	// ];
    
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class="modal-example-form card p-4 w-modal shadow-xl space-y-4">
        <div class="width-full flex flex-col space-y-2 py-8">
		<!-- {#each nav_items as route}

                <a href={route.link} class="bg-tertiary-200 btn text-tertiary-800 text-4xl font-light p-5"
                    on:click={() => modalStore.close()}>{route.title}</a>
           
        {/each} -->
		<a href='/menu' 
		on:click={() => modalStore.close()}
		hreflang={languageTag()}
		class="bg-tertiary-200 btn text-tertiary-800 text-4xl font-light p-5"
			>{m.menu()}</a>
		<a href='/#book' 
		on:click={() => modalStore.close()}
		hreflang={languageTag()}
		class="bg-tertiary-200 btn text-tertiary-800 text-4xl font-light p-5"
			>{m.reserve()}</a>
		<a href='/account' 
		on:click={() => modalStore.close()}
		hreflang={languageTag()}
		class="bg-tertiary-200 btn text-tertiary-800 text-4xl font-light p-5"
			>{m.account()}</a>
    	</div>
	</div>
{/if}