<script>
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';
    import { ProgressRadial } from '@skeletonlabs/skeleton';
    export let src;

    let loaded = false;
    onMount(() => {
        const img = new Image();
        img.src = src;

        img.onload = () => loaded = true;
	})
</script>

{#if loaded == false}
    <div class="spinner p-10 m-10">
        <ProgressRadial width='w-16'
        meter="stroke-surface-500" track="stroke-surface-500/30"/>
    </div>
{:else}
    <img src="{src}" alt="hero" in:fade={{ duration: 500 }}>
{/if}


<style>
    .spinner {
        width: 100%;
        height: 100%;
        padding-bottom: 20px;
    
        display: flex;
        justify-content: space-around;
        align-items: center;

    }
</style>