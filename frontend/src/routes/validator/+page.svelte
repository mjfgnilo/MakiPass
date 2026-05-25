<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { api } from '$lib/api.js';
  import { user, isAuthenticated, logout } from '$lib/auth.js';

  let pendingScans = [];
  let flaggedScans = [];
  let stats = { pending: 0, approved: 0, rejected: 0 };
  let loading = true;
  let activeTab = 'pending';

  onMount(async () => {
    if (!$isAuthenticated || !['admin', 'validator'].includes($user?.role)) {
      goto('/admin/login');
      return;
    }
    await loadData();
  });

  async function loadData() {
    loading = true;
    try {
      [pendingScans, flaggedScans, stats] = await Promise.all([
        api('/validator/pending'),
        api('/validator/flagged'),
        api('/validator/stats'),
      ]);
    } catch (e) {
      console.error(e);
    } finally {
      loading = false;
    }
  }

  async function approveScan(scanId) {
    try {
      await api(`/validator/approve/${scanId}`, { method: 'POST' });
      await loadData();
    } catch (e) {
      alert(e.message);
    }
  }

  async function rejectScan(scanId) {
    const reason = prompt('Enter rejection reason:');
    if (!reason) return;
    try {
      await api(`/validator/reject/${scanId}`, {
        method: 'POST',
        body: JSON.stringify({ reason }),
      });
      await loadData();
    } catch (e) {
      alert(e.message);
    }
  }

  function handleLogout() {
    logout();
    goto('/');
  }
</script>

<nav class="navbar">
  <div>
    <a href="/validator"><strong>✅ MakiPass Validator</strong></a>
  </div>
  <div>
    <a href="/admin">Admin Dashboard</a>
    <a href="/validator">Validator</a>
    <button class="btn btn-danger" style="padding: 0.4rem 1rem; font-size: 0.85rem;" on:click={handleLogout}>Logout</button>
  </div>
</nav>

<div class="container">
  <h1>✅ Scan Validation</h1>

  {#if loading}
    <p>Loading...</p>
  {:else}
    <!-- Stats -->
    <div class="grid mb-2" style="grid-template-columns: repeat(3, 1fr);">
      <div class="card stat-card">
        <div class="number" style="color: var(--warning);">{stats.pending}</div>
        <div class="label">Pending</div>
      </div>
      <div class="card stat-card">
        <div class="number" style="color: var(--success);">{stats.approved}</div>
        <div class="label">Approved</div>
      </div>
      <div class="card stat-card">
        <div class="number" style="color: var(--danger);">{stats.rejected}</div>
        <div class="label">Rejected</div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex gap-1 mb-2">
      <button class="btn {activeTab === 'pending' ? 'btn-primary' : 'btn-secondary'}" on:click={() => activeTab = 'pending'}>
        Pending ({pendingScans.length})
      </button>
      <button class="btn {activeTab === 'flagged' ? 'btn-danger' : 'btn-secondary'}" on:click={() => activeTab = 'flagged'}>
        Flagged ({flaggedScans.length})
      </button>
    </div>

    <!-- Pending Scans -->
    {#if activeTab === 'pending'}
      {#if pendingScans.length === 0}
        <div class="card text-center">
          <p style="color: var(--text-muted);">🎉 No pending scans to verify!</p>
        </div>
      {:else}
        {#each pendingScans as scan}
          <div class="card flex justify-between items-center">
            <div>
              <p><strong>{scan.missions?.title || 'Unknown Mission'}</strong></p>
              <p style="color: var(--text-muted); font-size: 0.85rem;">
                Player: {scan.player_id} | QR: {scan.qr_codes?.code || 'N/A'}
              </p>
              <p style="color: var(--text-muted); font-size: 0.8rem;">
                Scanned: {new Date(scan.scanned_at).toLocaleString()}
              </p>
            </div>
            <div class="flex gap-1">
              <button class="btn btn-success" style="padding: 0.4rem 0.8rem;" on:click={() => approveScan(scan.id)}>
                ✓ Approve
              </button>
              <button class="btn btn-danger" style="padding: 0.4rem 0.8rem;" on:click={() => rejectScan(scan.id)}>
                ✗ Reject
              </button>
            </div>
          </div>
        {/each}
      {/if}
    {/if}

    <!-- Flagged Scans -->
    {#if activeTab === 'flagged'}
      {#if flaggedScans.length === 0}
        <div class="card text-center">
          <p style="color: var(--text-muted);">No flagged scans.</p>
        </div>
      {:else}
        {#each flaggedScans as scan}
          <div class="card" style="border-color: var(--danger);">
            <div class="flex justify-between items-center">
              <div>
                <p><strong>⚠️ {scan.missions?.title || 'Unknown Mission'}</strong></p>
                <p style="color: var(--text-muted); font-size: 0.85rem;">
                  Player: {scan.player_id}
                </p>
                <p style="color: var(--danger); font-size: 0.85rem;">
                  Flagged for anomalous activity
                </p>
              </div>
              <div class="flex gap-1">
                <button class="btn btn-success" style="padding: 0.4rem 0.8rem;" on:click={() => approveScan(scan.id)}>
                  ✓ Clear
                </button>
                <button class="btn btn-danger" style="padding: 0.4rem 0.8rem;" on:click={() => rejectScan(scan.id)}>
                  ✗ Ban
                </button>
              </div>
            </div>
          </div>
        {/each}
      {/if}
    {/if}
  {/if}
</div>
