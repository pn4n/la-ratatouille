<script>
	export let user;
</script>

<div id="book">
	<!-- {JSON.stringify(user)} -->
	<div
		class="p-2 lg:p-8 md:m-8 mx-0 my-8 space-y-5 card rounded-none bg-surface-50 text-primary-500"
	>
		<h1 class="h1 text-primary-500 font-light mx-auto text-center text-5xl pl-3">
			{m.reserve_title()}
		</h1>

		<p class="text-xl text-secondary-800 font-light">
			{m.reserve_text1()}
		</p>
		{#if !user}
			<p class="text-xl text-secondary-800 font-light">
				{@html m.reserve_userWarn()}
				<!-- Please 
                <a href="/login?tab=register" class="anchor">create an account</a>
                or 
                <a href="/login" class="anchor">login</a> to save the history of your reservations
				and orders. -->
			</p>
		{/if}
		<form method="POST" class="space-y-5">
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
				<label class="label">
					<span>{m.name()}</span>
					<input
						class="input variant-form-material"
						type="text"
						name="name"
						value={user?.name || null}
						required autocomplete="given-name"
					/>
				</label>
				<label class="label">
					<span>{m.email()}</span>
					<input
						class="input variant-form-material"
						type="email"
						name="email"
						value={user?.email || null}
						required autocomplete="email"
					/>
				</label>
				<label class="label">
					<span>{m.phone()}</span>
					<input
						class="input variant-form-material"
						type="tel"
						name="phone"
						value={user?.phone || null}
						required autocomplete="tel"
					/>
				</label>
			</div>
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
				<label class="label">
					<span>{m.date()}</span>
					<input class="input variant-form-material" type="date" name="date" required />
				</label>
				<label class="label">
					<span>{m.time()}</span>
					<input class="input variant-form-material" type="time" name="time" required />
				</label>
				<label class="label">
					<span>{m.nOfPeople()}</span>
					<input class="input variant-form-material" type="number" min="1" name="people" required />
				</label>
			</div>
			<label class="label">
				<span>{m.comment()}</span>
				<input class="input variant-form-material" type="text" name="comment" />
			</label>

			<button class="btn variant-filled-primary block mx-auto rounded-none">{m.reserve_bookBTN()}</button>
		</form>
	</div>
</div>

<style>
	p {
		text-indent: 20px;
	}
	#book {
		padding-top: 20px;
	}
</style>
