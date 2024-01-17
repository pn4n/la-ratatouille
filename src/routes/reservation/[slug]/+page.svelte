<script>
    import ReservationInfo from "$lib/components/Reservation_info.svelte";
    import { fade } from "svelte/transition";
    import { ProgressBar } from '@skeletonlabs/skeleton';
	export let data;
    export let form;

</script>

<div transition:fade={{ duration: 300 }} class="pb-10">

    {#await data.res}
    <div class="flex flex-col items-center space-y-5 font-light">
        <p class="text-2xl text-center text-tertiary-800">Please wait, we are loading your reservation...</p>
        <ProgressBar
            value={undefined}
            meter="bg-secondary-500"
            track="bg-secondary-500/30"
            class="w-1/2"
        />
    </div>
    {:then res}
        <ReservationInfo {res} />
        {#if form?.message}
            <p class="text-2xl text-center text-primary-500">
                {form?.message}</p>
        {/if}

    {/await}
    
</div>