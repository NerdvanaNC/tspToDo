<script>
  import { enhance } from '$app/forms';

  export let data; // data = { todoLists: {...} }
  export let form;
</script>

<main class="w-96 h-[45vh]">
  <div class="card w-full h-full m-0 bg-base-200">
    <h2 class="card-title bg-primary px-8 py-4 text-primary-content rounded-tl-md rounded-tr-md">Your Lists</h2>
    <div class="py-8 px-8 overflow-auto text-md">      
        {#if data.todoLists.length > 0}
          <ol class="list-decimal list-inside neutral-content">
            {#each data.todoLists as todoList}
              <li><a href="/{todoList.id}">{todoList.name}</a></li>
            {/each}
          </ol>
        {:else}
          <p class="text-center text-neutral-content mt-16">No items yet!</p>
        {/if}
    </div>
  </div>
  <form class="form-control mx-6 block" method="POST" action="?/addNewList" use:enhance>
    <div class="relative mt-6">
      <div class="{form?.form === 'addNewList' && form?.error ? 'tooltip tooltip-open' : ''} tooltip-bottom tooltip-error w-full" data-tip="ToDo lists need a name at least 3 characters long.">
        <input type="text" name="todoListName" placeholder="Create new list..." class="input input-sm input-ghost py-1 px-0 pr-10 h-auto w-full outline-0 focus:outline-0 border-b-2 border-0 border-b-neutral rounded-none" />
        <button type="submit" class="absolute right-0 top-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path class="fill-neutral-content" fill="currentColor" d="M4.4 19.425q-.5.2-.95-.088T3 18.5v-3.725q0-.35.2-.625t.55-.35L11 12l-7.25-1.8q-.35-.075-.55-.35T3 9.225V5.5q0-.55.45-.838t.95-.087l15.4 6.5q.625.275.625.925t-.625.925l-15.4 6.5Z"/></svg>
        </button>
      </div>
    </div>
  </form>
</main>