<script>
    import { Tab, TabGroup } from '@skeletonlabs/skeleton';
    let tabSet = 0
</script>

<div class="p-5 lg:p-8 space-y-5 card rounded-none bg-surface-50 text-primary-500 max-w-3xl mx-auto">

<TabGroup justify="justify-center">
	<Tab class="h1 text-primary-500 font-light mx-auto text-center text-5xl pl-3"
        bind:group={tabSet} name="tab2" value={0}>Sign in</Tab>
    <Tab class="h1 text-primary-500 font-light mx-auto text-center text-5xl pl-3"
        bind:group={tabSet} name="tab3" value={1}>Sign up</Tab>

	<svelte:fragment slot="panel">
		{#if tabSet === 0}
        <form method="POST" class="space-y-5 py-5" action="?/signin">

            <div class="mx-auto max-w-md space-y-5">
                <label class="label">
                    <span>Email</span>
                    <input class="input variant-form-material " type="email" name="username" required/>
                </label>
                <label class="label">
                    <span>Password</span>
                    <input class="input variant-form-material" type="password" name="password" required/>
                </label>
            </div>
            <button class="btn variant-filled-primary block mx-auto rounded-none">Log in</button>

            </form>
		{:else if tabSet === 1}
        <form method="POST" class="space-y-5 py-5" action="?/signup">

            <div class="mx-auto max-w-md space-y-5">
                <label class="label">
                    <span>Email</span>
                    <input class="input variant-form-material " type="text" name="email" required/>
                </label>

                <label class="label">
                    <span>Name</span>
                    <input class="input variant-form-material" type="text" name="name" required/>
                </label>
                <label class="label">
                    <span>Password</span>
                    <input class="input variant-form-material" type="text" name="password" required/>
                </label>
            </div>
            <button class="btn variant-filled-primary block mx-auto rounded-none">Create an account</button>

            </form>
		{/if}
	</svelte:fragment>
</TabGroup>
			

</div>
