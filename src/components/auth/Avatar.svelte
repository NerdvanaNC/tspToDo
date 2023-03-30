<script>
  import { enhance } from '$app/forms';

  export let user;
</script>

{#if user}
  <!-- Ignoring some a11y warnings coming from Daisy UI -->
  <div class="dropdown dropdown-end absolute right-10 top-10">
    <div class="avatar">
      <div class="w-12 rounded-full">
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label tabindex="0" class="cursor-pointer"><img src="https://api.dicebear.com/6.x/thumbs/svg?seed={user.username}" alt="{user.username}'s Avatar" title="{user.username}" /></label>
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <ul tabindex="0" class="dropdown-content menu p-4 mt-4 shadow bg-base-200 rounded-box w-52">
          <li><a href="/profile">Profile</a></li>
          <li>
            <form class="p-0" action="/logout" method="POST" use:enhance>
              <button class="block w-full text-left px-4 py-3" type="submit">Logout</button>
            </form>
          </li>
        </ul>
      </div>
    </div>
  </div>
{:else}
  <div class="absolute right-10 top-10">
    <a class="btn btn-ghost mr-4" href="/login">Login</a>
    <a class="btn btn-primary" href="/register">Register</a>
  </div>
{/if}