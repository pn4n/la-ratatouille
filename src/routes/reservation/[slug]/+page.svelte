<script>
	export let data;

    // $: console.log(JSON.stringify(data))
</script>
{#await data.res}
<div>
    hi
</div>
{:then res}
<div class="p-2 lg:p-8 md:m-8 mx-0 my-8 space-y-5 card rounded-none bg-surface-50 text-xl text-secondary-800 ">
    <h1 class="h1 text-primary-500 font-light mx-auto text-center text-5xl pl-3 ">
        Table reservation 
    </h1>
    <p class="text-xl text-secondary-800 font-light">
        For same-day reservations, we strongly advise you to call, as we may not be able to guarantee you a table. 
        Please wait for an email or phone confirmation of your booking before coming to the restaurant.
        Pleasase arrive a couple of minutes before the reservation time.
    </p>
    <div class="p-3 text-xl text-secondary-800 font-light grid md:grid-cols-2">
        <p>Date: {res.date}</p>
        <p>Time: {res.time}</p>
        {#each res.info.split('\n') as info}
        <p>{info}</p>
        {/each}

    </div>
    <p class="mx-5 rounded-none code p-3 text-xl text-primary-800 font-light">Status: {res.status}</p>
    <p class="text-xl text-secondary-800 font-light">
        After the confirmation your reservation status will be updated. 
        You can only create one reservation as unauthorized user.
        Please create an account to save the history of your reservations and orders.
    </p>
    <div class="logo-cloud grid-cols-1 grid-cols-1 md:grid-cols-2 gap-1">
        <a class="btn variant-filled-primary mx-5 p-3 rounded-none"
            href="/reservation/{res.id}/cancel">Cancel reservation</a>
        <a class="btn variant-filled-primary mx-5 p-3 rounded-none"
            href="/account">Create an account or login</a>

    </div>
    <!-- {JSON.stringify(res)} -->
</div>
{/await}
<!-- <h1>{data.title}</h1>
<div>{@html data.content}</div>
<h1>{data.number}</h1> -->

<style>
    p {
		text-indent: 20px;
	}

</style>