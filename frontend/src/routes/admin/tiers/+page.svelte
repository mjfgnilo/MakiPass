<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { api } from '$lib/api.js';
  import { user, isAuthenticated } from '$lib/auth.js';

  let tiers = [];
  let loading = true;
  let showForm = false;
  let form = { tier_number: 1, xp_required: 100, reward_description: '' };

  onMount(async () => {
    if (!$isAuthenticated || $user?.role !== 'admin') {
      goto('/admin/login');
      return;
    }
    await loadTiers();
  });

  async function loadTiers() {
    loading = true;
    try {
      tiers = await api('/battlepass/tiers');
    } catch (e) {
      console.error(e);
    } finally {
      loading = false;
    }
  }

  async function createTier() {
    try {
      await api('/admin/tiers', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      showForm = false;
      form = { tier_number: tiers.length + 2, xp_required: (tiers.length + 1) * 100, reward_description: '' };
      await loadTiers();
    } catch (e) {
      alert(e.message);
    }
  }
</script>

<nav class="navbar">
  <div><a href="/admin"><strong>⚙️ MakiPass Admin</strong></a></div>
  <div>
    <a href="/admin">Dashboard</a>
    <a href="/admin/missions">Missions</a>
    <a href="/admin/qr">QR Codes</a>
    <a href="/admin/tiers">Tiers</a>
  </div>
</nav>

<div class="container">
  <div class="flex justify-between items-center mb-2">
    <h1>🏆 Battlepass Tier Management</h1>
    <button class="btn btn-primary" on:click={() => showForm = !showForm}>
      {showForm ? 'Cancel' : '+ New Tier'}
    </button>
  </div>

  {#if showForm}
    <div class="card mb-2">
      <h3>Create New Tier</h3>
      <form on:submit|preventDefault={createTier}>
        <label>Tier Number</label>
        <input type="number" bind:value={form.tier_number} min="1" required />

        <label>XP Required</label>
        <input type="number" bind:value={form.xp_required} min="1" required />

        <label>Reward Description</label>
        <input type="text" bind:value={form.reward_description} placeholder="e.g., Exclusive sticker pack" required />

        <button type="submit" class="btn btn-success">Create Tier</button>
      </form>
    </div>
  {/if}

  {#if loading}
    <p>Loading tiers...</p>
  {:else if tiers.length === 0}
    <div class="card text-center">
      <p style="color: var(--text-muted);">No tiers configured yet.</p>
    </div>
  {:else}
    {#each tiers as tier}
      <div class="card tier-card">
        <div style="flex: 1;">
          <h3>Tier {tier.tier_number}</h3>
          <p style="color: var(--text-muted);">{tier.reward_description}</p>
        </div>
        <div>
          <span class="badge badge-success">{tier.xp_required} XP</span>
        </div>
      </div>
    {/each}
  {/if}
</div>
