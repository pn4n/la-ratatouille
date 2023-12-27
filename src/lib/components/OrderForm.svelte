<script>
  import { enhance } from '$app/forms';
  
	import { cart } from '$lib/stores/cart';
  export let sum
  
  export let form_status 

  let form

  // $: json_order = JSON.stringify(cart_list)
  $: form_status = form?.success

  // $: total = Object.values(cart_list).reduce(
  //   (total, curr) => total + curr.price * curr.counter,
  //   0
  // );


</script>

  <table>
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">{ 'menu.order.title' }</th>
        <th scope="col">{ 'menu.order.price' }</th>
        <th scope="col">{ 'menu.order.subtotal' }</th>
      </tr>
    </thead>
    <tbody>
      {#each Object.entries(cart) as [key, item]}
      
        <tr>
          <th scope="row">{item.counter}</th>
          <td>{item.title}</td>
          <td>{item.price}</td>
          <td>{item.price * item.counter}</td>
        </tr>
      {/each}
    </tbody>
    <tfoot>
      <tr>
        <th scope="col">{ 'menu.order.total' }</th>
        <td />
        <td />
        <td>{sum}</td>
      </tr>
    </tfoot>
  </table>

  <form method="POST" bind:this={form}
        use:enhance={() => {
          form_status = 'loading';

          return async ({ update }) => {
            await update();
            form_status = 'complete'
          };
        }}>

    <!-- FIRST THING TO FIX!!!!!  -->
    <!-- <input type="text" id="order" name="order" hidden 
      bind:value={json_order}> -->

      <label for="name">{ 'form.name' }
        <input type="text" id="name" name="name" required />
      </label>

    <div class="grid">
      <label for="email">{ 'form.email' }
        <input type="email" id="email" name="email" />
      </label>

      <label for="phone">{ 'form.phone' }
        <input type="phone" id="phone" name="phone" required />
      </label>
    </div>

    <label for="address">{ 'form.address' }
      <input type="text" id="address" name="address" />
    </label>

    <label for="comment"
      >{ 'form.comment' }
      <input type="text" id="comment" name="comment" />
    </label>

    <button class="outline">{ 'form.submit' }</button>
  </form>
