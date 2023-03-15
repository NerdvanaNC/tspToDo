<script>
  export let data; // data = { todoLists: {...} }
</script>

<main class="card w-96 min-h-[40vh] m-0 bg-base-200">
  <h2 class="card-title bg-primary px-8 py-4 text-primary-content rounded-tl-md rounded-tr-md">Your Lists</h2>
  <div class="py-6 px-8">
    <ol class="list-decimal list-inside">
      {#each data.todoLists as todoList}
        <li><a href="/{todoList.id}">{todoList.name}</a></li>
      {/each}
    </ol>
  </div>
</main>