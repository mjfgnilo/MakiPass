<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { api } from '$lib/api.js';
  import { setUser, user, isAuthenticated } from '$lib/auth.js';

  let username = '';
  let password = '';
  let error = '';
  let loading = false;

  onMount(() => {
    if ($isAuthenticated && ($user?.role === 'admin' || $user?.role === 'validator')) {
      goto('/admin');
    }
  });

  async function handleLogin() {
    loading = true;
    error = '';
    try {
      const result = await api('/auth/admin/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });
      setUser(result.user, result.access_token);
      goto('/admin');
    } catch (e) {
      error = e.message || 'Invalid credentials';
    } finally {
      loading = false;
    }
  }
</script>

<div class="container text-center" style="padding-top: 10vh;">
  <a href="/" style="color: var(--text-muted); text-decoration: none;">← Back to Home</a>

  <h1 style="margin-top: 2rem;">⚙️ Admin Login</h1>
  <p style="color: var(--text-muted); margin-bottom: 2rem;">
    Administrator & Validator Portal
  </p>

  {#if error}
    <div class="card" style="border-color: var(--danger); max-width: 400px; margin: 0 auto 1rem;">
      <p style="color: var(--danger);">{error}</p>
    </div>
  {/if}

  <div class="card" style="max-width: 400px; margin: 0 auto;">
    <form on:submit|preventDefault={handleLogin}>
      <label for="username">Username <span class="text-danger">*</span></label>
      <input id="username" type="text" bind:value={username} placeholder="Enter username" required />

      <label for="password">Password <span class="text-danger">*</span></label>
      <input id="password" type="password" bind:value={password} placeholder="Enter password" required />

      <button type="submit" class="btn btn-primary" style="width: 100%;" disabled={loading}>
        {#if loading}
          Signing in...
        {:else}
          Sign In
        {/if}
      </button>
    </form>

    <p style="color: var(--text-muted); margin-top: 1rem; font-size: 0.85rem;">
      This is a separate portal for administrators and validators only.
    </p>
  </div>
</div>
