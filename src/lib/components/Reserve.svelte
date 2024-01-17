<div  id="book" >

<div class="p-2 lg:p-8 md:m-8 mx-0 my-8  space-y-5 card rounded-none bg-surface-50 text-primary-500">
    <h1 class="h1 text-primary-500 font-light mx-auto text-center text-5xl pl-3 ">
        Reserve a table
    </h1>

    <p class="text-xl text-secondary-800 font-light">
"La Ratatouille" strives to feature market and local cuisine. 
The majority of products are organic and local, selected from producers and breeders in the region.
    </p>
    <p class="text-xl text-secondary-800 font-light">
Please <a href="/account" class="anchor">create an account</a> to save the history of your reservations and orders.
    </p>
    <form method="POST" class="space-y-5">

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <label class="label">
            <span>Name</span>
            <input class="input variant-form-material " type="text" name="name" required/>
        </label>
        <label class="label">
            <span>Email</span>
            <input class="input variant-form-material" type="email" name="email" required/>
        </label>
        <label class="label">
            <span>Phone number</span>
            <input class="input variant-form-material" type="tel" name="phone" required/>
        </label>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">

        <label class="label">
            <span>Date</span>
            <input class="input variant-form-material" type="date" name="date" required/>
        </label>
        <label class="label">
            <span>Time</span>
            <input class="input variant-form-material " type="time" name="time" required/>
        </label>
        <label class="label">
            <span>Number of people</span>
            <input class="input variant-form-material" type="number" min="1" name="people" required/>
        </label>
    </div>
    <label class="label">
        <span>Comment</span>
        <input class="input variant-form-material" type="text" name="comment"/>
    </label>

    <button class="btn variant-filled-primary block mx-auto rounded-none">Book a table</button>
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
