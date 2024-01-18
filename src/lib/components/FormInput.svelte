<script>
	export let name, value;
	let open = false;
</script>

<form method="POST" class="p-0 py-3 md:p-3" action="?/edit/{name}">
	
    <span>{name.toUpperCase()}</span>
    <div class="mx-auto grid grid-cols-[1fr_auto]">
        
		<label class="label">
			<input class="input variant-form-material" type="text" {name} {value} required />
		</label>
        <button class="w-fit" disabled>
			<img class="my-auto mx-2" src="/svg/edit.svg" alt="icon" />
		</button>
	</div>
</form>
