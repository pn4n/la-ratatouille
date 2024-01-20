<script>
    import { page } from "$app/stores"
    import { fade } from "svelte/transition";
    import FormInput from '$lib/components/FormInput.svelte';
    import StatusList from '$lib/components/StatusList.svelte';
    import { getToastStore } from '@skeletonlabs/skeleton';
    import {ProgressBar} from "@skeletonlabs/skeleton";
	  const toastStore = getToastStore();

    export let user = $page.data.user
    export let data;
    export let form;
    if (form?.success) {
		toastStore.trigger({
			message: 'Success!',
			autohide: 10000,
			background: 'variant-filled-secondary',
		});
	} else if (form?.success === false) {
		toastStore.trigger({
			message: 'Error: ' + form?.message || 'An error occurred',
			timeout: 10000,
			background: 'text-white bg-tertiary-400',
		})
	}
  </script>
<div in:fade={{ duration: 300 }}
	class="p-5 lg:p-8 space-y-5 card rounded-none bg-surface-50 text-primary-500 max-w-8xl mx-auto"
>
    <div class="text-right">
            <a class="btn bg-tertiary-400" href="/signout">
                <img src="/svg/signout.svg" alt="icon" class="w-3 h-3">
            </a>
    </div>
	<div class="py-5 space-y-5">
			<p class=" text-primary-500 font-light mx-auto text-4xl pl-3">
				Welcome back, {user.name}
			</p>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-x-8">
			<!-- TODO: enable edit icon -->
			<FormInput name="name" value={user.name} />
			<FormInput name="email" value={user.email} />
			<FormInput name="phone" value={user.phone} />
			<FormInput name="address" value={user.address} />
		</div>

		<hr />
		<div class="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] pt-5">
			<div>
				<p class=" text-primary-500 font-light text-4xl p-3">Orders</p>
        {#await data.orders}
          <div class="flex flex-col items-center space-y-5 font-light" in:fade={{ duration: 300 }}>
            <p class="text-2xl text-center text-tertiary-800">Please wait, we are loading your reservation...</p>
            <ProgressBar
                value={undefined}
                meter="bg-secondary-500"
                track="bg-secondary-500/30"
                class="w-1/2"
            />
        </div>
        {:then list} 
				  <StatusList {list} type="order" />
        {/await}
			</div>
			<span class="divider-vertical h-auto" />
			<div>
				<p class=" text-primary-500 font-light text-4xl p-3">Reservations</p>
        {#await data.reserves}
          <div class="flex flex-col items-center space-y-5 font-light" in:fade={{ duration: 300 }}>
            <p class="text-2xl text-center text-tertiary-800">Please wait, we are loading your reservation...</p>
            <ProgressBar
                value={undefined}
                meter="bg-secondary-500"
                track="bg-secondary-500/30"
                class="w-1/2"
            />
        </div>
        {:then list} 
				  <StatusList {list} type="reservation" />
        {/await}
			</div>
		</div>
	</div>
</div>