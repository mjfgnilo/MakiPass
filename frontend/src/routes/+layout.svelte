<script>
  import '../app.css';
  import { onMount } from 'svelte';
  import { loadUser } from '$lib/auth.js';

  onMount(() => {
    loadUser();
  });
</script>

<slot />
