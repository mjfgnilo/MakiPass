<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { api } from '$lib/api.js';
  import { user, isAuthenticated } from '$lib/auth.js';

  let missions = [];
  let qrCodes = [];
  let loading = true;
  let selectedMission = '';
  let generatedQr = null;
  let qrType = 'static';

  onMount(async () => {
    if (!$isAuthenticated || $user?.role !== 'admin') {
      goto('/admin/login');
      return;
    }
    try {
      [missions, qrCodes] = await Promise.all([
        api('/missions'),
        api('/qr'),
      ]);
    } catch (e) {
      console.error(e);
    } finally {
      loading = false;
    }
  });

  async function generateQr() {
    if (!selectedMission) return;
    try {
      const endpoint = qrType === 'chain'
        ? `/admin/qr/generate-chain/${selectedMission}`
        : `/admin/qr/generate/${selectedMission}`;
      generatedQr = await api(endpoint, { method: 'POST' });
      // Reload QR list
      qrCodes = await api('/qr');
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
  <h1>📱 QR Code Management</h1>

  <div class="card mb-2">
    <h3>Generate New QR Code</h3>
    <label>Select Mission</label>
    <select bind:value={selectedMission}>
      <option value="">-- Select a mission --</option>
      {#each missions as mission}
        <option value={mission.id}>{mission.title}</option>
      {/each}
    </select>

    <label>QR Type</label>
    <select bind:value={qrType}>
      <option value="static">Static (permanent)</option>
      <option value="chain">Chain (rotates every 30s)</option>
    </select>

    <button class="btn btn-primary" on:click={generateQr} disabled={!selectedMission}>
      Generate QR Code
    </button>
  </div>

  {#if generatedQr}
    <div class="card mb-2 text-center">
      <h3>Generated QR Code</h3>
      <img src={generatedQr.qr_image} alt="QR Code" style="max-width: 250px; margin: 1rem auto; display: block; border-radius: 8px;" />
      <p style="color: var(--text-muted); font-size: 0.85rem;">Code: {generatedQr.code}</p>
      {#if generatedQr.type === 'chain'}
        <p style="color: var(--warning);">⚠️ This code expires in 30 seconds</p>
      {/if}
    </div>
  {/if}

  <h2>Existing QR Codes</h2>
  {#if loading}
    <p>Loading...</p>
  {:else if qrCodes.length === 0}
    <div class="card"><p style="color: var(--text-muted);">No QR codes generated yet.</p></div>
  {:else}
    {#each qrCodes as qr}
      <div class="card flex justify-between items-center">
        <div>
          <p><strong>{qr.missions?.title || 'Unknown Mission'}</strong></p>
          <p style="color: var(--text-muted); font-size: 0.85rem;">Code: {qr.code}</p>
        </div>
        <div>
          <span class="badge {qr.is_active ? 'badge-success' : 'badge-danger'}">
            {qr.is_active ? 'Active' : 'Inactive'}
          </span>
          <span class="badge badge-warning" style="margin-left: 0.5rem;">{qr.type}</span>
        </div>
      </div>
    {/each}
  {/if}
</div>
