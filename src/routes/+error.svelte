<script>
	import { page } from '$app/stores';
</script>

<div class="text-center p-3">
    <p class="p-3 h1 font-light text-tertiary-800">{$page.status}: {$page.error.message}</p>
    <p class="p-3 text-3xl font-light text-tertiary-800">{m.an_error_occured()}</p>

    <a href="/" class="m-3 text-3xl font-light anchor">{m.back_to_home()}</a>

</div>
