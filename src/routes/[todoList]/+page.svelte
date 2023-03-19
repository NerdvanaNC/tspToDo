<script>
  import { enhance } from '$app/forms';
  
  export let data; // data = { todoLists: {...}, todoItems: {...} }
</script>

<main class="card w-96 min-h-[40vh] m-0 bg-base-200">
  <h2 class="card-title bg-primary px-8 py-4 text-primary-content rounded-tl-md rounded-tr-md">
    <div class="absolute -left-10">
      <a href="/">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path class="fill-primary" d="m12 16l1.4-1.4l-1.6-1.6H16v-2h-4.2l1.6-1.6L12 8l-4 4Zm0 6q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"/></svg>
      </a>
    </div>
    {data.todoList.name}
  </h2>
  <div class="py-6 px-8">
    <ul>
      {#each data.todoItems as todoItem}
        <li>
          <form class="form-control" method="POST" action="?/markAsDone" use:enhance>
            <label class="{todoItem.done ? 'line-through' : ''} label">
              <span class="label-text">{todoItem.description}</span>
              <input class="checkbox" type="checkbox" on:change={(e) => e.target.closest('form').requestSubmit() } checked={todoItem.done} />
            </label>
            <input type="hidden" name="todoItemID" value="{todoItem.id}" />
          </form>
        </li>
      {/each}
    </ul>
  </div>
</main>