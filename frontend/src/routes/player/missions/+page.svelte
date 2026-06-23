<script>
  import { onMount } from 'svelte';
  import { api } from '$lib/api.js';
  import { user, logout } from '$lib/auth.js';
  import { goto } from '$app/navigation';

  let missions = [];
  let playerMissions = [];
  let loading = true;

  // ⚡ Bolt: Pre-compute a Set of completed mission IDs for O(1) lookups during rendering.
  // This prevents an O(N^2) bottleneck when rendering large lists of missions.
  $: completedMissionIds = new Set(
    playerMissions
      .filter(pm => pm.status === 'completed')
      .map(pm => pm.mission_id)
  );

  onMount(async () => {
    try {
      [missions, playerMissions] = await Promise.all([
        api('/missions'),
        api('/missions/player/my'),
      ]);
    } catch (e) {
      console.error(e);
    } finally {
      loading = false;
    }
  });

  function handleLogout() {
    logout();
    goto('/');
  }
</script>

<nav class="navbar">
  <div>
    <a href="/player/missions"><strong>🎮 MakiPass</strong></a>
  </div>
  <div>
    <a href="/player/missions">Missions</a>
    <a href="/player/scan">Scan QR</a>
    <a href="/player/battlepass">Battlepass</a>
    <button class="btn btn-danger" style="padding: 0.4rem 1rem; font-size: 0.85rem;" on:click={handleLogout}>Logout</button>
  </div>
</nav>

<div class="container">
  <h1>📋 Available Missions</h1>

  {#if loading}
    <p>Loading missions...</p>
  {:else if missions.length === 0}
    <div class="card text-center">
      <p style="color: var(--text-muted);">No missions available yet. Check back later!</p>
    </div>
  {:else}
    <div class="grid">
      {#each missions as mission}
        <div class="card">
          <div class="flex justify-between items-center" style="margin-bottom: 0.5rem;">
            <h3>{mission.title}</h3>
            {#if completedMissionIds.has(mission.id)}
              <span class="badge badge-success">✓ Done</span>
            {:else}
              <span class="badge badge-warning">Active</span>
            {/if}
          </div>
          <p style="color: var(--text-muted); margin-bottom: 0.5rem;">{mission.description}</p>
          <div class="flex justify-between items-center">
            <span style="color: var(--secondary); font-weight: 600;">+{mission.xp_reward} XP</span>
            <span class="badge" style="background: rgba(108,92,231,0.2); color: var(--primary);">{mission.type}</span>
          </div>
          {#if mission.ends_at}
            <p style="color: var(--warning); font-size: 0.8rem; margin-top: 0.5rem;">
              ⏰ Ends: {new Date(mission.ends_at).toLocaleDateString()}
            </p>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>
