<script lang="ts">
	// import type { SvelteComponent } from 'svelte';

	// import { ListBox, ListBoxItem, getModalStore } from '@skeletonlabs/skeleton';
    import { getModalStore } from '@skeletonlabs/skeleton';

	// Props
	/** Exposes parent props to this component. */
	// export const parent: SvelteComponent ='';

	const modalStore = getModalStore();

	let nav_items = [
		{ link: '/', title: 'Main page' },

		{ link: '/menu', title: 'Menu' },

		{ link: '/#book', title: 'Reserve' },

		{ link: '/account', title: 'Account' }
	];
    
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class="modal-example-form card p-4 w-modal shadow-xl space-y-4">
        <div class="width-full flex flex-col space-y-2 py-8">
		{#each nav_items as route}

                <a href={route.link} class="bg-tertiary-200 btn text-tertiary-800 text-4xl font-light p-5"
                    on:click={() => modalStore.close()}>{route.title}</a>
            <!-- {/if} -->
        {/each}
    	</div>
	</div>
{/if}