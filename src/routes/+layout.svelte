<script>
  import Avatar from '../components/auth/Avatar.svelte';
  import Logo from '../components/logo/Logo.svelte';
  import '../app.css';
</script>
<svelte:head>
  <title>ToDo • Teaspoon Stack</title>
</svelte:head>

<div class="container mx-auto w-screen h-screen px-3 pb-6 pt-32 lg:p-6 flex items-center justify-center relative">
  <Logo />
  <Avatar />
  <slot />
</div>