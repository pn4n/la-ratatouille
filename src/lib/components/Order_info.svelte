<script>
	import { fade } from 'svelte/transition';
	export let order;
</script>

{JSON.stringify(order)}
	<div in:fade={{ duration: 300 }}
		class="p-2 lg:p-8 md:m-8 mx-0 my-8 space-y-5 card rounded-none bg-surface-50 text-xl text-secondary-800"
	>
		<h1 class="h1 text-primary-500 font-light mx-auto text-center text-5xl pl-3">
			Order
		</h1>
		<p class="text-xl text-secondary-800 font-light">
			For same-day reservations, we strongly advise you to call, as we may not be able to guarantee
			you a table. Please wait for an email or phone confirmation of your booking before coming to
			the restaurant. Pleasase arrive a couple of minutes before the reservation time.
		</p>
		<div class="p-3 text-xl text-secondary-800 font-light grid md:grid-cols-2">
			
            <p>Date: {order.address}</p>
            <p>Address: {order.date_created}</p>
			<!-- <p>Time: {order.time}</p> -->
			{#each order.info.split(', ') as info}
				<p>{info}</p>
			{/each}

            <!-- {#each order.items as item}
							<tr>
								<td>{item.title}</td>
								<td>{item.quantity}</td>
								<td>{item.price}</td>
								<td>{(item.quantity * item.price).toFixed(2)}</td>
							</tr>
			{/each} -->
		</div>
		<p class="mx-5 rounded-none code p-3 text-xl text-primary-800 font-light">
			Status: {order.status}
		</p>
		<p class="text-xl text-secondary-800 font-light">
			After the confirmation your reservation status will be updated. You can only create one
			reservation as unauthorized user. Please create an account to save the history of your
			reservations and orders.
		</p>
		<div class="logo-cloud grid-cols-1 grid-cols-1 md:grid-cols-2 gap-1 rounded-none">
            {#if order.status != 'canceled'}
			<form action="?/cancel" method="POST">
				<button class="btn variant-filled-primary w-full p-3">Cancel reservation</button>
			</form>
            {:else}
                <a class="btn variant-filled-primary w-full p-3" href="/#book"
					>New reservation</a
				>
            {/if}
			<div>
				<a class="btn variant-filled-primary w-full p-3" href="/login"
					>Create an account or login</a
				>
			</div>
		</div>
	</div>
  
<style>
	p {
		text-indent: 20px;
	}
</style>
