<script>
	import { fade } from 'svelte/transition';
	import { formatDate } from '$lib/utils'
	export let res;
	export let isAuthenticated

</script>
	<div in:fade={{ duration: 300 }}
		class="p-2 lg:p-8 md:m-8 mx-0 my-8 space-y-5 card rounded-none bg-surface-50 text-xl text-secondary-800"
	>
		<h1 class="h1 text-primary-500 font-light mx-auto text-center text-5xl pl-3">
			{m.reservation_info_header()}
		</h1>
		<p class="text-xl text-secondary-800 font-light">
			{m.reservation_info_warn()}
		</p>
		<div class="px-0 py-3 xs:px-3 text-xl text-secondary-800 font-light grid md:grid-cols-2">
			<p>{m.date()}: {formatDate(res.date_created)}</p>
			<p>{m.time()}: {res.time}</p>
			{#each res.info.split('\n') as info}
				<p>{info}</p>
			{/each}
		</div>
		<p class="px-0 py-3 xs:px-3 rounded-none code p-3 text-xl text-primary-800 font-light">
			{m.status()}: {res.status}
		</p>
		<p class="text-xl text-secondary-800 font-light">
			After the confirmation your reservation status will be updated.
		</p>


		{#if !isAuthenticated}
		<p class="text-xl text-secondary-800 font-light">
			{m.no_acc_warn()}
			{@html m.reserve_userWarn()}
		</p>
	{/if}
	<div class="logo-cloud mx-auto rounded-none">
		{#if (res.status == 'created' || res.status == 'accepted')}
			<form action="?/cancel" method="POST" class="mx-auto">
				<button class="btn variant-filled-primary p-3">{m.cancel_reservation()}</button>
			</form>
		{:else}
			<a class="btn variant-filled-primary mx-auto p-3" href="/#book">{m.new_reservation()}</a>
		{/if}
	</div>
	</div>
  
<style>
	p {
		text-indent: 20px;
	}
</style>
