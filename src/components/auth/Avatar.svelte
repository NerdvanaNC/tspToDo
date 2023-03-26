<script>
  import { pb, currentUser } from '$lib/pocketbase';
  import { enhance, applyAction } from '$app/forms';
</script>

{#if $currentUser}
  <!-- Ignoring some a11y warnings coming from Daisy UI -->
  <div class="dropdown dropdown-end absolute right-10 top-10">
    <div class="avatar">
      <div class="w-12 rounded-full">
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label tabindex="0" class="cursor-pointer"><img src="https://api.dicebear.com/5.x/thumbs/svg?seed=Loki" alt="User Avatar" /></label>
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <ul tabindex="0" class="dropdown-content menu p-4 mt-4 shadow bg-base-200 rounded-box w-52">
          <li><a href="/profile">Profile</a></li>
          <li>
            <form action="/logout" method="POST" use:enhance={() => {
              return async({ result }) => {
                pb.authStore.clear();
                await applyAction(result);
              }
            }}>
              <button type="submit">Logout</button>
            </form>
          </li>
        </ul>
      </div>
    </div>
  </div>
{:else}
  <div class="absolute right-10 top-10">
    <button class="btn btn-ghost mr-4"><a href="/login">Login</a></button>
    <button class="btn btn-primary">Sign Up</button>
  </div>
{/if}