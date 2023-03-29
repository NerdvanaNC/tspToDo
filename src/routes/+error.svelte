<script>
  import { page } from '$app/stores';
</script>

<div class="max-w-lg">
  <h1 class="relative text-center text-6xl mb-4">
    {$page.status}
  </h1>
  <h2 class="text-center">{$page.error.message}</h2>
</div>