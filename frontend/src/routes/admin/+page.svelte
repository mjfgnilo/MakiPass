<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { api } from '$lib/api.js';
  import { user, isAuthenticated, logout } from '$lib/auth.js';

  let stats = { total_players: 0, total_missions: 0, total_scans: 0 };
  let loading = true;

  onMount(async () => {
    if (!$isAuthenticated || ($user?.role !== 'admin' && $user?.role !== 'validator')) {
      goto('/admin/login');
      return;
    }
    try {
      stats = await api('/admin/dashboard');
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
    <a href="/admin"><strong>⚙️ MakiPass Admin</strong></a>
  </div>
  <div>
    <a href="/admin">Dashboard</a>
    <a href="/admin/missions">Missions</a>
    <a href="/admin/qr">QR Codes</a>
    <a href="/admin/tiers">Tiers</a>
    <a href="/validator">Validator</a>
    <button class="btn btn-danger" style="padding: 0.4rem 1rem; font-size: 0.85rem;" on:click={handleLogout}>Logout</button>
  </div>
</nav>

<div class="container">
  <h1>📊 Admin Dashboard</h1>

  {#if loading}
    <p>Loading dashboard...</p>
  {:else}
    <div class="grid" style="grid-template-columns: repeat(3, 1fr);">
      <div class="card stat-card">
        <div class="number">{stats.total_players}</div>
        <div class="label">Total Players</div>
      </div>
      <div class="card stat-card">
        <div class="number">{stats.total_missions}</div>
        <div class="label">Total Missions</div>
      </div>
      <div class="card stat-card">
        <div class="number">{stats.total_scans}</div>
        <div class="label">Total Scans</div>
      </div>
    </div>

    <div class="grid mt-2" style="grid-template-columns: repeat(2, 1fr);">
      <a href="/admin/missions" class="card" style="text-decoration: none;">
        <h3>📋 Manage Missions</h3>
        <p style="color: var(--text-muted);">Create, edit, and delete missions</p>
      </a>
      <a href="/admin/qr" class="card" style="text-decoration: none;">
        <h3>📱 QR Codes</h3>
        <p style="color: var(--text-muted);">Generate and manage QR codes</p>
      </a>
      <a href="/admin/tiers" class="card" style="text-decoration: none;">
        <h3>🏆 Battlepass Tiers</h3>
        <p style="color: var(--text-muted);">Configure tier rewards and XP requirements</p>
      </a>
      <a href="/validator" class="card" style="text-decoration: none;">
        <h3>✅ Validation</h3>
        <p style="color: var(--text-muted);">Verify scans and detect fraud</p>
      </a>
    </div>
  {/if}
</div>
