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
	<h1 class="h1 text-primary-500 font-light mx-auto text-center text-5xl pl-3">{m.order()}</h1>
	<div class="px-0 py-3 xs:px-3 text-xl text-secondary-800 font-light grid md:grid-cols-2">
		<p>{m.date()}: {formatDate(order.date_created)}</p>
		<p>{m.address()}: {order.address}</p>
		{#each order.info.split(', ') as info}
			<p>{info}</p>
		{/each}
	</div>
			<div class="table-container my-5 mx-0">
				<table class="table table-hover text-sm">
					<thead>
						<tr>
							<th>{m.item_title()}</th>
							<th>{m.item_quantity()}</th>
							<th>{m.item_price()}</th>
							<th>{m.total()}</th>
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
							<th colspan="3">{m.order_total()}</th>
							<td>{sum.toFixed(2)}</td>
						</tr>
					</tfoot>
				</table>
			</div>
	<p class="px-0 py-3 xs:px-3 rounded-none code bg-tertiary-300 text-surface-800 text-xl font-light">
		{m.status()}: {order.status}
	</p>
	<p class="text-xl text-secondary-800 font-light">
		{m.order_reserve_status_warn()}
	</p>
	{#if !isAuthenticated}
		<p class="text-xl text-secondary-800 font-light">
			{m.no_acc_warn()}
			{@html m.reserve_userWarn()}
		</p>
	{/if}
	<div class="logo-cloud mx-auto rounded-none">
		{#if (order.status == 'created' || order.status == 'accepted')}
			<form action="?/cancel" method="POST" class="mx-auto">
				<button class="btn variant-filled-primary p-3">{m.cancel_order()}</button>
			</form>
		{:else}
			<a class="btn variant-filled-primary mx-auto p-3" href="/menu">{m.new_order()}</a>
		{/if}
	</div>
</div>

<style>
	p {
		text-indent: 20px;
	}
</style>
