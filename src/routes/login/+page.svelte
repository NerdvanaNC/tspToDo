<script>
  import { pb } from '$lib/pocketbase';
  import { applyAction, enhance } from '$app/forms';

  export let form;
</script>

<main class="w-96 h-[45vh]">
  <div class="card w-full h-full m-0 bg-base-200">
    <h2 class="card-title bg-primary px-8 py-4 text-primary-content rounded-tl-md rounded-tr-md">Login</h2>
    <div class="py-14 px-8 overflow-auto text-md">
      <form action="?/login" method="POST" class="form-control" use:enhance={() => {
        return async({ result }) => {
          pb.authStore.loadFromCookie(document.cookie);
          applyAction(result);
        }
      }}>
        <input type="text" name="username" placeholder="Username:" class="input w-full mb-6" />
        <input type="password" name="password" placeholder="Password:" class="input w-full mb-12" />
        <div class="{form?.error ? 'tooltip tooltip-open' : ''} tooltip-bottom tooltip-error w-full block" data-tip="{form?.errorText}">
          <button class="btn btn-primary flex justify-between w-full">
            Login
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path class="fill-primary-content" fill="currentColor" d="M4.4 19.425q-.5.2-.95-.088T3 18.5v-3.725q0-.35.2-.625t.55-.35L11 12l-7.25-1.8q-.35-.075-.55-.35T3 9.225V5.5q0-.55.45-.838t.95-.087l15.4 6.5q.625.275.625.925t-.625.925l-15.4 6.5Z"/></svg>
          </button>
        </div>
      </form>
    </div>
  </div>
</main>