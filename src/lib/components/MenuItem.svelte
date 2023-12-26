<script>
    import LazyImage from "$lib/components/LazyImage.svelte";
    import { getTitle } from '$lib/utils'

    export let item;
    export let url;
    export let cart_list;
    export let items_list;

    const add_item = (id) => {
        const it = items_list.find((item) => item["id"] === id);

        console.log(cart_list);
        cart_list[id] = { title: it.title, price: it.price, counter: 1 };
    };

    const handle_increse = (id) => {
        cart_list[id]["counter"]++;
        console.log(cart_list);
    };

    const handle_decrese = (id) => {
        cart_list[id]["counter"]--;
        if (cart_list[id]["counter"] < 1) {
            delete cart_list[id];
        }
    };
</script>

<article class="container">
    <header>{ getTitle(item, 'en')}</header>

    <LazyImage src="{url}/assets/{item.img}" alt="menu item" />

    <footer>
        <p>{item.price} { 'menu.currency' }</p>
        <div class="grid">
            {#if cart_list.hasOwnProperty(item.id)}
                <button class="outline" on:click={() => handle_increse(item.id)}
                    >+</button
                >

                <input
                    type="number"
                    bind:value={cart_list[item.id]["counter"]}
                />

                <button class="outline" on:click={() => handle_decrese(item.id)}
                    >-</button
                >
            {:else}
                <button class="outline" on:click={() => add_item(item.id)}>
                    { 'menu.add' }</button
                >
            {/if}
        </div>
    </footer>
</article>

<style>
    :root {
        --transaparent-color: rgba(0, 0, 0, 0);
    }
    p {
        margin: auto 0;
        width: 300px;
    }
    article {
        text-align: center;
        aspect-ratio: 9 / 12;
        max-width: 500px;
        position: relative;
        background-size: cover;
    }
    footer {
        display: flex;
        justify-content: space-around;
        position: absolute;
        bottom: 0;
        margin: 0;
        width: 100%;
    }
    header {
        padding: auto 0;
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
    input {
        max-height: fit-content;
        margin: auto 0;
        height: 50px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }

    /* remove  arrows */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    input[type="number"] {
        -moz-appearance: textfield;
    }
</style>
