<script>
    import { languageTag } from '$paraglide/runtime.js';

    import LazyImage from "$lib/components/LazyImage.svelte";
    import { getTitle } from '$lib/utils'
    import { cart } from '$lib/stores/cart';

    export let item;
    export let url;
    let itemInCart;
  
  $: itemInCart = $cart.find(it => it.id === item.id);
</script>

<div class="card article text-xl rounded-none py-12 text-secondary-800">
    <div class="card-header bg-surface-50">{ getTitle(item, languageTag())}</div>

    <LazyImage src="{url}/assets/{item.img}" alt="menu item" />

    <div class="card-footer bg-surface-50">
        <p>{item.price} {m.currency()}</p>
        <div class="grid ">
            {#if itemInCart?.quantity}
            <button class="btn px-3 variant-soft-tertiary" on:click={() => cart.decreaseQuantity(item.id)}
                >-</button
            >

                <span class="btn px-3 "> {itemInCart?.quantity}</span>


                <button class="btn px-3 variant-soft-tertiary" on:click={() =>  cart.increaseQuantity(item.id)}
                    >+</button
                >
            {:else}
                <button class="btn variant-soft-tertiary" on:click={() => cart.addToCart(item)}>
                    {m.menu_add()}</button
                >
            {/if}
        </div>
    </div>
</div>

<style>
    p {
        margin: auto 25px;
    }
    .article {
        text-align: center;
        aspect-ratio: 9 / 12;
        max-width: 500px;
        position: relative;
        background-size: cover;
    }
    .card-footer {
        display: flex;
        justify-content:space-between;
        position: absolute;
        bottom: 0;
        margin: 0;
        padding: 0 10px 0;
        width: 100%;
    }
    .card-header {
        padding: 10px 0;
        position: absolute;
        top: 0;
        margin: 0;
        width: 100%;
    }
    .grid {
        height: 70px;
        width: fit-content;
        display: flex;
        justify-content: space-between;
        column-gap: 0px;
    }
    button,
    span {
        max-height: fit-content;
        margin: auto 03px;
        height: 30px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }
</style>
