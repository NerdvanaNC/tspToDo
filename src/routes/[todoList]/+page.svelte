<script>
  import { enhance } from '$app/forms';
  import { afterUpdate } from 'svelte';
  import { fly } from 'svelte/transition';
  import GoBack from '../../components/util/GoBack.svelte';
  
  export let data; // data = { todoLists: {...}, todoItems: {...} }
  export let form;

  let addNewInput;

  afterUpdate(() => {
    addNewInput.focus();
  })
</script>

<main class="w-96 h-[45vh]">
  <div class="card w-full h-full m-0 bg-base-200">
    <div class="card-title bg-primary px-8 py-0 text-primary-content rounded-tl-md rounded-tr-md">
      <GoBack />
      <form class="form-control w-full py-2" method="POST" action="?/updateTodoListName" use:enhance>
        <div class="relative">
          <div class="{form?.form === 'updateTodoListName' && form?.error ? 'tooltip tooltip-open' : ''} tooltip-top tooltip-error w-full font-normal" data-tip="ToDo lists need a name at least 3 characters long.">
            <input type="text" name="todoListName" class="input input-ghost w-full bg-primary focus:bg-primary outline-0 focus:outline-0 border-b-2 border-0 border-b-primary-content focus:text-primary-content px-0 pr-10 rounded-none text-lg font-bold" value="{data.todoList.name}">
            <button type="submit" class="absolute right-0 top-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path class="fill-primary-content" fill="currentColor" d="M4.4 19.425q-.5.2-.95-.088T3 18.5v-3.725q0-.35.2-.625t.55-.35L11 12l-7.25-1.8q-.35-.075-.55-.35T3 9.225V5.5q0-.55.45-.838t.95-.087l15.4 6.5q.625.275.625.925t-.625.925l-15.4 6.5Z"/></svg>
            </button>
          </div>
        </div>
      </form>
    </div>
    <div class="py-8 px-8 overflow-auto">
      {#if data.todoItems.length > 0}
        <ul>
          {#each data.todoItems as todoItem (todoItem.id)}
            <li class="relative pl-6" in:fly|local={ { y: 10, duration: 50 } } out:fly|local={ { x: 10, duration: 50 } }>
              <form class="form-control" method="POST" action="?/markAsDone" use:enhance>
                <button class="-ml-4 mr-2 absolute bottom-[10px] left-3" formaction="?/delete">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path class="fill-error" d="M7.7 16.3q.275.275.7.275q.425 0 .7-.275l2.9-2.9l2.925 2.925q.275.275.688.262q.412-.012.687-.287q.275-.275.275-.7q0-.425-.275-.7L13.4 12l2.925-2.925q.275-.275.262-.688q-.012-.412-.287-.687q-.275-.275-.7-.275q-.425 0-.7.275L12 10.6L9.075 7.675Q8.8 7.4 8.388 7.412q-.413.013-.688.288q-.275.275-.275.7q0 .425.275.7l2.9 2.9l-2.925 2.925q-.275.275-.262.687q.012.413.287.688ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"/></svg>
                </button>
                <label class="{todoItem.done ? 'line-through' : ''} label cursor-pointer">
                  <span class="label-text">
                      {todoItem.description}
                  </span>
                  <input class="checkbox" type="checkbox" on:click|preventDefault={(e) => e.target.closest('form').requestSubmit() } checked={todoItem.done} />
                </label>
                <input type="hidden" name="todoItemID" value="{todoItem.id}" />
              </form>
            </li>
          {/each}
        </ul>
      {:else}
        <p class="text-center text-neutral-content mt-16">No items yet!</p>
      {/if}
    </div>
  </div>
  <form class="form-control mx-6 block" method="POST" action="?/addNew" use:enhance>
    <div class="relative mt-6">
      <div class="{form?.form === 'addNew' && form?.error ? 'tooltip tooltip-open' : ''} tooltip-bottom tooltip-error w-full" data-tip="ToDo items need a description.">
        <input bind:this={addNewInput} type="text" name="newItem" placeholder="Add new item..." class="input input-sm input-ghost py-1 px-0 pr-10 h-auto w-full outline-0 focus:outline-0 border-b-2 border-0 border-b-neutral rounded-none" />
        <button type="submit" class="absolute right-0 top-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path class="fill-neutral-content" fill="currentColor" d="M4.4 19.425q-.5.2-.95-.088T3 18.5v-3.725q0-.35.2-.625t.55-.35L11 12l-7.25-1.8q-.35-.075-.55-.35T3 9.225V5.5q0-.55.45-.838t.95-.087l15.4 6.5q.625.275.625.925t-.625.925l-15.4 6.5Z"/></svg>
        </button>
      </div>
    </div>
  </form>
</main>