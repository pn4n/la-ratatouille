<script>
    export let src
    export let alt

    let imgLoading = true

    const showImg = () => { 
        imgLoading = false 
        }
</script>

<div aria-busy="{imgLoading}">
    
    <img src="{src}" alt="{alt}" loading="lazy"
    on:load={showImg}>

</div>

<style>
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        /* opacity: 0; */
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

</style>
