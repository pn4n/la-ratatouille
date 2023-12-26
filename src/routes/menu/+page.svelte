<script>    
    import { show_notif, getTitle } from '$lib/utils'

    import MenuFooter from "$lib/components/MenuFooter.svelte";
    import OrderForm from "$lib/components/OrderForm.svelte";
    import LoadingDirectus from "$lib/components/LoadingDirectus.svelte";
    import MenuItem from "$lib/components/MenuItem.svelte";

    export let data;

    let dialog;
    let cart_list = {}; //should be writable!
    let form_status;

    $: sum = Object.values(cart_list).reduce(
        (total, curr) => total + curr.price * curr.counter,
        0
    );

    $: show_notif(form_status);

    const close_dialog = () => dialog.close();
</script>

<dialog bind:this={dialog}>
    <article hidden={sum < 1}>
        <header>
            <a
                href="#close"
                aria-label="Close"
                class="close"
                on:click={close_dialog}
            />
            { 'menu checkout' }
        </header>

        <OrderForm bind:cart_list bind:form_status />
    </article>
</dialog>

{#await data.streamed.dir}

    <LoadingDirectus />

{:then dir}
<!-- {console.log(JSON.stringify(dir.menu_items))} -->
    {#each dir.menu_items as category}
        <h1>{ getTitle(category, 'en')}</h1>
        <!-- {console.log(JSON.stringify(category.translations))} -->
        <div class="grid-container">
            {#each category.items as item}
                <MenuItem
                    item={item}
                    url={dir.url}
                    items_list={dir.items}
                    bind:cart_list
                />
            {/each}
        </div>
        <hr />
    {/each}

    <div hidden={sum < 1}>
        <MenuFooter bind:sum bind:dialog />
    </div>

{:catch error}

    <p>{ 'directus failed' }</p>
    <p>{error.message}</p>

{/await}

<style>
    dialog {
        overflow-y: hidden; /* Hide vertical scrollbar */
    }

    p {
        margin: auto 0;
        width: 300px;
    }

    .grid-container {
        /**
        * User input values.
        */
        --grid-layout-gap: 10px;
        --grid-column-count: 2; /* This gets overridden by an inline style. */
        --grid-item--min-width: 300px; /* This gets overridden by an inline style. */

        /**
        * Calculated values.
        */
        --gap-count: calc(var(--grid-column-count) - 1);
        --total-gap-width: calc(var(--gap-count) * var(--grid-layout-gap));
        --grid-item--max-width: calc(
            (100% - var(--total-gap-width)) / var(--grid-column-count)
        );

        display: grid;
        grid-template-columns: repeat(
            auto-fill,
            minmax(
                max(var(--grid-item--min-width), var(--grid-item--max-width)),
                1fr
            )
        );
        grid-gap: var(--grid-layout-gap);
    }
</style>
