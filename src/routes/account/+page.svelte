<script>
    import { page } from "$app/stores"
    import Login from "$lib/components/Login.svelte";

    // export let data;
    export let form;
  </script>
  <!-- {JSON.stringify(data)} -->
  <p>
    {#if $page.data.session}
      <span class="signedInText">
        <small>Signed in as</small><br />
        <strong>{$page.data.session.user?.name ?? "User"}</strong>
      </span>
      <button  class="button">Sign out</button>
    {:else}
        <Login />
      {#if form?.error}
        <p class="error">{JSON.stringify(form.error)}</p>
      {/if}
      <button >Sign In with GitHub</button>
    {/if}
  </p>