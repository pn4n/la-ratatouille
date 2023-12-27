<script>
    import { getDrawerStore } from "@skeletonlabs/skeleton";

    const drawerStore = getDrawerStore();

    export let sum = 0
    

    const handle_click = () => {
        drawerStore.open()
    }
</script>

<div class="wrapper">
    <article class="grid">
        <div class="sum-div">
            <p>Total: {sum} EUR</p>
        </div>
        <button class="btn variant-filled-tertiary" type="button" on:click={handle_click}>
            Checkout
        </button>
    </article>
</div>


<style>
    p {
        min-width: fit-content;
        margin: auto;
        font-weight: 500;
    }
    article {
        position:relative;
        bottom: 0;
        /* left: 5rem; */
        right: 0;
        padding: 10px;
        height: min-content;
        text-align: center;
        /* margin: 10px auto; */
    }
    .sum-div {
        display: flex;
    }
    .wrapper {
        max-width: 1200px;
        width: 100%;
        position: absolute;
        bottom: 0;
        border: 2px red solid;
    }
    button {
        /* display: inline-flex;
        align-items: center; */
        margin: 0px 6px;
        max-width: 300px;
        /* border-left: none;
        border-right: none; */
        /* font-size: 1em;
    line-height: 1.2;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    border-radius: 0.375em; */
    }

    .grid {
        display: flex;
        justify-content: end;
    }
</style>