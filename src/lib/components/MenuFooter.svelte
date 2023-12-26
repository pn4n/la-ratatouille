<script>
    
    export let sum = 0
    export let dialog

    const handle_click = () => {
        dialog.showModal()
    }
</script>

<article class="grid">
    <div class="sum-div">
        <p>menu.sum</p>
        <p>{sum} {'menu.currency'}</p>
    </div>
    <button class="outline contrast" type="button" on:click={handle_click}>
        { 'menu.chechkout' }
    </button>
</article>

<style>
    p {
        min-width: fit-content;
        margin: auto;
        font-weight: 500;
    }
    article {
        position: fixed;
        bottom: 0;
        left: 5rem;
        right: 5rem;
        padding: 10px;
        height: min-content;
        text-align: center;
        margin: 10px auto;
    }
    .sum-div {
        display: flex;
    }
    button {
        /* display: inline-flex;
        align-items: center; */
        margin-bottom: 0px;
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
        display: inline-flex;
        justify-content: space-around;
    }
</style>