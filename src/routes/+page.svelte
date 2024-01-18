<script>
	import Reserve from '$lib/components/Reserve.svelte';
	import { fade } from 'svelte/transition';

	import { getToastStore } from '@skeletonlabs/skeleton';
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

<!-- <div>
{JSON.stringify(data)}
</div> -->
<div class="bg-white" in:fade={{ duration: 300 }}>
	<div class="space-y-5 grid grid-cols-1 p-0 lg:grid-cols-2">
		<div class=" ml-auto">
			<h1 class="h1 text-primary-500 font-light ml-auto text-5xl pl-3">
				A Mecca of French gastronomy
			</h1>

			<img src="/hero1_c.png" alt="hero" class="w-3/4 ml-auto" />
		</div>
		<div>
			<div class="p-2 space-y-2 rounded-none font-light">
				<p class="text-xl text-tertiary-800">
					Known as the last bastion in London of classically rich French haute cuisine, La
					Ratatouille restaurant has become a London institution, internationally recognised for its
					culinary excellence and unparalleled attention to detail. It was the first UK restaurant
					to be awarded one, two, and then three Michelin Stars, and was the first Michelin-rated
					restaurant to offer a set-price lunch.
				</p>
				<p class="text-xl text-tertiary-800">
					When it opened over 50 years ago, London’s dining scene was almost non-existent on a
					global scale. Today, London is an industry leader, a melting pot of culinary talents and
					international gastronomy – influenced in no small part by La Ratatouille restaurant, which
					has encouraged discerning dining and attracted internationally renowned chefs to its
					kitchen.
				</p>
				<p class="text-xl text-tertiary-800">
					La Ratatouille restaurant maintains the very highest of standards, with a sense of
					unremitting concentration and effortless attention to the needs of the clients, who are
					immediately made to feel at home by the team.
				</p>
			</div>
		</div>
	</div>

	<div class="space-y-5 grid grid-cols-1 py-8 p-0 lg:grid-cols-2">
		<div class="ml-0 lg:order-last">
			<h1 class="h1 text-primary-500 font-light mr-auto text-5xl pl-3">
				Wine Cellar & Wine library
			</h1>

			<img src="/hero2.png" alt="hero" class="w-3/4 md:ml-0 sm:mx-auto" />
		</div>
		<div class="p-2 font-light flex items-center">
			<div class="p-2 space-y-2">
				<p class="text-xl text-tertiary-800">
					The restaurant at Relais Bernard Loiseau boasts one of the finest wine cellars in Burgundy
					(15 000 bottles, or 900 different labels).
				</p>
				<p class="text-xl text-tertiary-800">
					Executive Chef Sommelier Eric Goettelmann, Meilleur Ouvrier de France 2019, signs the
					menus of all our restaurants.
				</p>
				<p class="text-xl text-tertiary-800">
					We have a real wine's expertise. Our latest wine library features up to 40 wines by the
					glass. Discover the finest Burgundy's crus !
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
						Reserve a table
					</h1>

					<p class="text-xl text-secondary-800 font-light py-3">
						You already have an active  
						<a href="/reservation/{data.reservation}" class="anchor">reservation</a>.
						Please cancel it if you want to make a new one.
					</p>
				</div>
			</div>
		{:else}
			<Reserve user={data.user} />
		{/if}
	{/await}

	<div class="space-y-5 grid grid-cols-1 py-8 p-0 lg:grid-cols-2">
		<h1 id="book" class="h1 text-primary-500 font-light mx-auto text-center text-5xl pl-3">
			Contacts & Address
		</h1>

		<ol class="list text-xl font-light px-3 space-y-1 text-tertiary-800">
			<li>
				<span>Hours:</span>
				<span class="flex-auto">Tuesday–Saturday 5pm–10pm</span>
			</li>
			<li>
				<span>Address:</span>
				<span class="flex-auto">43 Upper Brook Street, London W1K 7QR</span>
			</li>
			<li>
				<span>E-mail:</span>
				<span class="flex-auto">ratatouille@example.com</span>
			</li>
			<li>
				<span>Phone:</span>
				<span class="flex-auto">+44 00 1234 5678</span>
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
	img {
		margin-top: -2vw;
		z-index: -100;
	}
</style>
