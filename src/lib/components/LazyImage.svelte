<script>
    import { ProgressRadial } from "@skeletonlabs/skeleton";
    import { onMount } from 'svelte'
    import { fade } from 'svelte/transition'

    export let src
    export let alt
    
	let loaded = false;
	// let failed = false;
	let loading = false;

	onMount(() => {
			const img = new Image();
			img.src = src;
			loading = true;

			img.onload = () => {
					loading = false;
					loaded = true;
			};
			img.onerror = () => {
					loading = false;
					// failed = true;
			};
	})
        
</script>


        {#if loading == true}
            <div class="spinner">
                <ProgressRadial width='w-16'
                meter="stroke-surface-500" track="stroke-surface-500/30"/>
            </div>
        {:else}
            <img src="{src}" alt="{alt}" loading="lazy" in:fade={{ duration: 500 }}>
        {/if}
        

<style>
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    div::before{
        position: relative;
        top:45%;
    }
    div {
        width: 100%;
        height: 100%;
        margin: auto;
    }
    .spinner {
        width: 100%;
        height: 100%;
        padding-bottom: 20px;
    
        display: flex;
        justify-content: space-around;
        align-items: center;

    }

</style>
