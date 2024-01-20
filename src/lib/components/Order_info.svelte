<script>
	import { fade } from 'svelte/transition';
	import { formatDate } from '$lib/utils'
	export let order;
	export let isAuthenticated;

	let sum = 0
	$: sum = order.order_items.reduce((acc, item) => acc + item.items_id.price * item.quantity, 0)
</script>
<div
	in:fade={{ duration: 300 }}
	class="p-2 lg:p-8 md:m-8 mx-0 my-8 space-y-5 card rounded-none bg-surface-50 text-xl text-secondary-800"
>
	<h1 class="h1 text-primary-500 font-light mx-auto text-center text-5xl pl-3">Order</h1>
	<p class="text-xl text-secondary-800 font-light">
		For same-day reservations, we strongly advise you to call, as we may not be able to guarantee
		you a table. Please wait for an email or phone confirmation of your booking before coming to the
		restaurant. Pleasase arrive a couple of minutes before the reservation time.
	</p>
	<div class="px-0 py-3 xs:px-3 text-xl text-secondary-800 font-light grid md:grid-cols-2">
		<p>Date: {formatDate(order.date_created)}</p>
		<p>Address: {order.address}</p>
		{#each order.info.split(', ') as info}
			<p>{info}</p>
		{/each}
	</div>
			<div class="table-container my-5 mx-0">
				<table class="table table-hover text-sm">
					<thead>
						<tr>
							<th>Title</th>
							<th>Quantity</th>
							<th>Price</th>
							<th>Sum</th>
						</tr>
					</thead>
					<tbody>
					{#each order.order_items as item}
						<tr>
							<td>{item.items_id.title}</td>
							<td>{item.quantity}</td>
							<td>{item.items_id.price}</td>
							<td>{(item.items_id.price * item.quantity).toFixed(2)}</td>
						</tr>
					{/each}
					</tbody>
					<tfoot>
						<tr>
							<th colspan="3">Total</th>
							<td>{sum.toFixed(2)}</td>
						</tr>
					</tfoot>
				</table>
			</div>
	<p class="px-0 py-3 xs:px-3 rounded-none code bg-tertiary-300 text-surface-800 text-xl font-light">
		Status: {order.status}
	</p>
	<p class="text-xl text-secondary-800 font-light">
		After the confirmation your order status will be updated. 
		Orders with status "created" and "accepted" can only be canceled. 
		If you want to cancel the order with another status, please contact us by phone.
	</p>
	{#if !isAuthenticated}
		<p class="text-xl text-secondary-800 font-light">
			You can only create one
			order as unauthorized user. Please 
			<a href="/login?tab=register" class="anchor">create an account</a> or
			<a href="/login" class="anchor">login</a>
			 to save the history of your
			reservations and orders.
		</p>
	{/if}
	<div class="logo-cloud mx-auto rounded-none">
		{#if (order.status == 'created' || order.status == 'accepted')}
			<form action="?/cancel" method="POST" class="mx-auto">
				<button class="btn variant-filled-primary p-3">Cancel order</button>
			</form>
		{:else}
			<a class="btn variant-filled-primary mx-auto p-3" href="/menu">New order</a>
		{/if}
	</div>
</div>

<style>
	p {
		text-indent: 20px;
	}
</style>
