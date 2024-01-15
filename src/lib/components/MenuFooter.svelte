<script>
    import { getDrawerStore } from "@skeletonlabs/skeleton";
    import { fly } from "svelte/transition";

    const drawerStore = getDrawerStore();

    export let sum = 0
    

    const handle_click = () => {
        drawerStore.open()
    }
</script>

<div class="wrapper" transition:fly={{ delay: 250, duration: 300, y: 100, opacity: 0.5 }}>
    <article class="rounded-md text-lg bg-surface-200">
        <div class="sum-div text-surface-800">
            <p>Total: {sum} EUR</p>
        </div>
        <button class="btn rounded-md variant-filled-primary" type="button" on:click={handle_click}>
            Checkout
        </button>
    </article>
</div>


<style>
    p {
        min-width: fit-content;
        margin: auto;
        /* font-weight: 500; */
    }
    article {
        position:absolute;
        bottom: 0;
        right: 10px;
        /* padding: 10px; */
        margin: 10px 0;
        height: min-content;
        text-align: center;
        display: flex;
        max-width: fit-content;
        /* border: 2px #8f442f solid; */
    }
    @media (max-width: 768px) {
        article {
            position: absolute;
            bottom: 0;
            padding: 0;
            left: 0;
            right: 0;
            width: 100%;
            margin: 0;
            max-width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .wrapper {
            position: absolute;
            bottom: 0;
            left: 0;
            padding: 0;
            /* margin: 0; */
        }
        button {
            width: 80vw;
            /* padding: 20px; */

            /* border: 2px rgba(255, 0, 0, 0.257) solid; */
            /* max-width: 500px; */
            }
        
    }
    .sum-div {
        display: inline-block;
        padding: 5px 10px;
        white-space: nowrap;
        padding: 10px;
        align-self: center;
    }
    .wrapper {
        max-width: 1200px;
        width: 100%;
        position: absolute;
        bottom: 0;
        /* border: 2px red solid; */
    }
    button {
        /* margin: 0px; */
        margin: 10px;
        padding: 10px;
        /* max-width: 300px; */
    }
</style>