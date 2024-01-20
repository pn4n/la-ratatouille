<script>
    import OrderInfo from "$lib/components/Order_info.svelte";
    import { fade } from "svelte/transition";
    import { ProgressBar } from '@skeletonlabs/skeleton';
    import { getToastStore } from '@skeletonlabs/skeleton';
    const toastStore = getToastStore();

	export let data;
    export let form;
    if (form?.success === false) {
		toastStore.trigger({
			message: 'Error: ' + (form?.message || 'an error occurred'),
			timeout: 10000,
			background: 'text-white bg-tertiary-400',
		})
	}
    
</script>

<div class="pb-10" in:fade={{ duration: 300 }}>

    {#await data} 
        <div class="flex flex-col items-center space-y-5 font-light" in:fade={{ duration: 300 }}>
            <p class="text-2xl text-center text-tertiary-800">Please wait, we are loading your reservation...</p>
            <ProgressBar
                value={undefined}
                meter="bg-secondary-500"
                track="bg-secondary-500/30"
                class="w-1/2"
            />
        </div>
    {:then res}

        <OrderInfo order={res.res.data[0]} isAuthenticated={res.isAuthenticated}/>

    {/await}
    
</div>