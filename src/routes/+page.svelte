<script>
	import Reserve from '$lib/components/Reserve.svelte';
	import Hero from '$lib/components/Hero_img.svelte';
	import { fade } from 'svelte/transition';

	// import hero from '/hero1_c.png';

	import { getToastStore } from '@skeletonlabs/skeleton';
	// import LazyImage from '$lib/components/LazyImage.svelte';
	const toastStore = getToastStore();

	// export let data;
	export let form;

	if (form?.success === false) {
		toastStore.trigger({
			message: 'An error occurred',
			timeout: 10000,
			background: 'variant-filled-tertiary'
		});
	}
	export let data;
</script>

<div class="bg-white" in:fade={{ duration: 300 }}>
	<div class="space-y-5 grid grid-cols-1 p-0 lg:grid-cols-2">
		<div class=" ml-auto">
			<h1 class="h1 text-primary-500 font-light ml-auto text-5xl pl-3">
				{m.main_h1()}
			</h1>
			<div class="w-3/4 ml-auto">
				<Hero src="/hero1_c.png"/>
			</div>
			<!-- <img src="/hero1_c.png" in:fade={{ duration: 300 }} 
			alt="hero" class="w-3/4 ml-auto" /> -->
		</div>
		<div>
			<div class="p-2 space-y-2 rounded-none font-light">
				<p class="text-xl text-tertiary-800">
					{m.main_p1_1()}
				</p>
				<p class="text-xl text-tertiary-800">
					{m.main_p1_2()}
				</p>
				<p class="text-xl text-tertiary-800">
					{m.main_p1_3()}
				</p>
			</div>
		</div>
	</div>

	<div class="space-y-5 grid grid-cols-1 py-8 p-0 lg:grid-cols-2">
		<div class="ml-0 lg:order-last">
			<h1 class="h1 text-primary-500 font-light mr-auto text-5xl pl-3">
				{m.main_h2()}
			</h1>

			<div class="w-3/4 md:ml-0 sm:mx-auto">
				<Hero src="/hero2.png" />
			</div>
			
			<!-- <img src="/hero2.png" in:fade={{ duration: 300 }}
				alt="hero" class="w-3/4 md:ml-0 sm:mx-auto" /> -->
		</div>
		<div class="p-2 font-light flex items-center">
			<div class="p-2 space-y-2">
				<p class="text-xl text-tertiary-800">
					{m.main_p2_1()}
				</p>
				<p class="text-xl text-tertiary-800">
					{m.main_p2_2()}
				</p>
				<p class="text-xl text-tertiary-800">
					{m.main_p2_3()}
				</p>
			</div>
		</div>
	</div>
	{#await data}
		<Reserve />
	{:then data}
		{#if data.reservation}
		<!-- {data.reservation} -->
			<div id="book">
				<div
					class="p-2 lg:p-8 md:m-8 mx-0 my-8 space-y-5 card rounded-none bg-surface-50 text-primary-500"
				>
					<h1 class="h1 text-primary-500 font-light mx-auto text-center text-5xl pl-3">
						{m.reserve_title()}
					</h1>

					<p class="text-xl text-secondary-800 font-light py-3">
						{@html m.reserve_anonymWithActiveReserve()}
					</p>
				</div>
			</div>
		{:else}
			<Reserve user={data.user} />
		{/if}
	{/await}

	<div class="space-y-5 grid grid-cols-1 py-8 p-0 lg:grid-cols-2">
		<h1 class="h1 text-primary-500 font-light mx-auto text-center text-5xl pl-3">
			{m.contact_title()}
		</h1>

		<ol class="list text-xl font-light px-3 space-y-1 text-tertiary-800">
			<li>
				<span>{m.hours()}:</span>
				<span class="flex-auto">{m.hours_data()}</span>
			</li>
			<li>
				<span>{m.address()}:</span>
				<span class="flex-auto">{m.address_data()}</span>
			</li>
			<li>
				<span>{m.email()}:</span>
				<span class="flex-auto">ratatouille@example.com</span>
			</li>
			<li>
				<span>{m.phone()}:</span>
				<span class="flex-auto">{m.phone_data()}</span>
			</li>
		</ol>
	</div>
</div>

<style>
	p {
		text-indent: 20px;
	}

	h1 {
		z-index: 1;
		position: relative;
	}
</style>
