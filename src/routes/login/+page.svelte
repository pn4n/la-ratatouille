<script>
	import { getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();

	export let data;
	export let form;

	if (form?.success) {
		toastStore.trigger({
			message: 'Success!',
			autohide: 10000,
			background: 'variant-filled-secondary'
		});
	} else if (form?.success === false) {
		toastStore.trigger({
			message: 'Error: ' + form?.message || 'An error occurred',
			timeout: 10000,
			background: 'text-white bg-tertiary-400'
		});
	}

	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import { blur, fade } from 'svelte/transition';
	let tabSet = data.tab === 'register' ? 1 : 0;
	let pass = '';
	let confpass;
	let validpass = false;
	$: validpass = pass !== '' && confpass === pass;
  
</script>

<div
	in:fade={{ duration: 300 }}
	class="p-5 lg:p-8 space-y-5 card rounded-none bg-surface-50 text-primary-500 max-w-3xl mx-auto"
>
	<TabGroup justify="justify-center">
		<Tab
			class="h1 text-primary-500 font-light mx-auto text-center text-4xl pl-3"
			bind:group={tabSet}
			name="tab2"
			value={0}>Sign in</Tab
		>
		<Tab
			class="h1 text-primary-500 font-light mx-auto text-center text-4xl pl-3"
			bind:group={tabSet}
			name="tab3"
			value={1}>Sign up</Tab
		>

		<svelte:fragment slot="panel">
			{#if tabSet === 0}
				<form method="POST" class="space-y-5 py-5" action="?/signin">
					<div class="mx-auto max-w-md space-y-5">
						<label class="label">
							<span>Email</span>
							<input class="input variant-form-material" type="email" name="email" required autocomplete="email"/>
						</label>
						<label class="label">
							<span>Password</span>
							<input class="input variant-form-material" type="password" name="password" required />
						</label>
					</div>
					<button class="btn variant-filled-primary block mx-auto rounded-none">Log in</button>
				</form>
			{:else if tabSet === 1}
				<form method="POST" class="space-y-5 py-5" action="?/signup">
					<div class="mx-auto max-w-md space-y-5">
						<label class="label">
							<span>Email</span>
							<input class="input variant-form-material" type="text" name="email" required autocomplete="email"/>
						</label>

						<label class="label">
							<span>Name</span>
							<input class="input variant-form-material" type="text" name="name" required autocomplete="given-name"/>
						</label>
						<label class="label">
							<span>Password</span>
							<input
								class="input variant-form-material"
								type="password"
								name="password"
								required
								bind:value={pass}
							/>
						</label>
						<label class="label">
							<span>Confirm password</span>
							<input
								class="input variant-form-material"
								type="password"
								name="password"
								required
								bind:value={confpass}
							/>
						</label>
						{#if pass !== '' && confpass !== pass}
							<p class="text-red-600 text-sm font-light" transition:blur={{ amount: 10 }}>
								Password not match
							</p>
						{/if}
					</div>
					<button
						class="btn variant-filled-primary block mx-auto rounded-none"
						disabled={!validpass}>Create an account</button
					>
				</form>
			{/if}
		</svelte:fragment>
	</TabGroup>
</div>
