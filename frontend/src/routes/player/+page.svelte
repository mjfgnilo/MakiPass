<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { supabase, api } from '$lib/api.js';
  import { user, isAuthenticated, setUser, logout } from '$lib/auth.js';

  let loading = false;
  let error = '';

  onMount(() => {
    if ($isAuthenticated && $user?.role === 'player') {
      goto('/player/missions');
    }
  });

  async function loginWithGoogle() {
    loading = true;
    error = '';
    try {
      const { data, error: authError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/player'
        }
      });
      if (authError) throw authError;
    } catch (e) {
      error = e.message;
      loading = false;
    }
  }

  onMount(async () => {
    // Check if returning from OAuth
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      try {
        const result = await api('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ access_token: session.access_token }),
        });
        setUser(result.user, result.access_token);
        goto('/player/missions');
      } catch (e) {
        error = e.message;
      }
    }
  });
</script>

<div class="container text-center" style="padding-top: 10vh;">
  <a href="/" style="color: var(--text-muted); text-decoration: none;">← Back to Home</a>

  <h1 style="margin-top: 2rem;">🎮 Player Login</h1>
  <p style="color: var(--text-muted); margin-bottom: 2rem;">
    Sign in to start scanning QR codes and earning XP!
  </p>

  {#if error}
    <div class="card" style="border-color: var(--danger); margin-bottom: 1rem;">
      <p style="color: var(--danger);">{error}</p>
    </div>
  {/if}

  <div class="card" style="max-width: 400px; margin: 0 auto;">
    <button class="btn btn-primary" style="width: 100%;" on:click={loginWithGoogle} disabled={loading}>
      {#if loading}
        Signing in...
      {:else}
        🔑 Sign in with Google
      {/if}
    </button>
    <p style="color: var(--text-muted); margin-top: 1rem; font-size: 0.85rem;">
      Uses Google OAuth via Supabase for secure authentication
    </p>
  </div>
</div>
