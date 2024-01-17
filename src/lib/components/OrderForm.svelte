<script>
	import { enhance } from '$app/forms';
	import { Stepper, Step } from '@skeletonlabs/skeleton';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { cart } from '$lib/stores/cart';
	import { show_notif } from '$lib/utils';

	const toastStore = getToastStore();
	let form_status;
	let form;

	const submit = () => {
		if (form) form.submit();
	};

	$: form_status = form?.success;
</script>

<div class="p-2">
	<Stepper regionContent="text-tertiary-800 py-2" on:complete={submit}>
		<Step>
			<svelte:fragment slot="header">
				<p class="text-primary-500 font-light text-4xl">Cart</p>
			</svelte:fragment>

			<div class="table-container text-tertiary-800">
				<table class="table table-hover">
					<thead>
						<tr>
							<th>Item</th>
							<th>Quantity</th>
							<th>Price</th>
							<th>Sum</th>
						</tr>
					</thead>
					<tbody>
						{#each $cart as item}
							<tr>
								<td>{item.title}</td>
								<td>{item.quantity}</td>
								<td>{item.price}</td>
								<td>{(item.quantity * item.price).toFixed(2)}</td>
							</tr>
						{/each}
					</tbody>
					<tfoot>
						<tr>
							<th colspan="3">Total sum</th>
							<td>SUM</td>
						</tr>
					</tfoot>
				</table>
			</div>
		</Step>
		<Step>
			<svelte:fragment slot="header">
				<h1 class="text-primary-500 font-light text-4xl p-2">Delivery info</h1>
			</svelte:fragment>
			<form
				method="POST"
				bind:this={form}
				use:enhance={() => {
					form_status = 'loading';

					return async ({ update }) => {
						await update();
						form_status = 'complete';
						show_notif(form_status, toastStore);
					};
				}}
			>
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
					<label class="label">
						<span>Name</span>
						<input class="input variant-form-material" type="text" name="name" required/>
					</label>
					<label class="label">
						<span>Phone number</span>
						<input class="input variant-form-material" type="tel" name="phone" required/>
					</label>
				</div>
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
					<label class="label">
						<span>E-mail</span>
						<input class="input variant-form-material" type="email" name="email" required/>
					</label>
					<label class="label">
						<span>Address</span>
						<input class="input variant-form-material" type="text" name="address" required/>
					</label>
				</div>
				<label class="label">
					<span>Comment</span>
					<textarea class="textarea variant-form-material" name="comment"></textarea>
				</label>
				<textarea class='hidden' name="order"> {JSON.stringify($cart.map(x => ({id:x.id, quantity:x.quantity})))} </textarea>
			</form>
		</Step>
	</Stepper>
</div>
