<script>
	export let list
	export let type
	import { formatDate } from '$lib/utils'
</script>
<div class="p-5">
{#if list.length > 1}

<div class="list-nav">
	<ul>
		<li>
			<a href="/nine"  style="pointer-events: none">
				<span class="badge bg-tertiary-400 rounded-none text-white">#</span>
				<span class="flex-auto">{m.date()}</span>
				<span class="text-right">{m.status()}</span>
			</a>
		</li>
	</ul>
	{#each list as item, i}
	<ul>
		<li>
			<a href="/{type}/{item.id}">
				<span class="badge bg-tertiary-400 rounded-none text-white">{i + 1}</span>
				<span class="flex-auto">{formatDate(item.date_created || item.date)}</span>
                <span class="text-right">{item.status}</span>
			</a>
		</li>
	</ul>
	{/each}

</div>
{:else}
<!-- <p class="text-xl text-surface-800">No items. You can create a new one 
	<a href="/{type == 'reservation' ? 'reservation' : 'menu'}" class="anchor">here</a>.</p> -->
	<p class="text-xl text-surface-800">{@html m.statusList_noItems()}</p>
{/if}

</div>
