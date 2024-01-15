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
		console.log('eh?')
	};

	$: form_status = form?.success;
	$: console.log(form);

	// $: show_notif(form_status, toastStore);
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
						{#each Object.values($cart) as item (item.id)}
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
						<input class="input variant-form-material" type="text" name="name" />
					</label>
					<label class="label">
						<span>Phone number</span>
						<input class="input variant-form-material" type="tel" name="phone"/>
					</label>
				</div>
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
					<label class="label">
						<span>E-mail</span>
						<input class="input variant-form-material" type="email" name="email"/>
					</label>
					<label class="label">
						<span>Address</span>
						<input class="input variant-form-material" type="text" name="address"/>
					</label>
				</div>
				<label class="label">
					<span>Comment</span>
					<textarea class="textarea variant-form-material" name="comment"></textarea>
				</label>
				<textarea class="hidden" name="order"> {JSON.stringify($cart)} </textarea>

				<!-- <button class="btn variant-filled-primary">{'form.submit'}</button> -->
			</form>
		</Step>
	</Stepper>
</div>
