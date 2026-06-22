<script>
  import { onMount } from 'svelte';
  import { api } from '$lib/api.js';
  import { goto } from '$app/navigation';

  let scanResult = null;
  let error = '';
  let scanning = false;
  let manualCode = '';

  async function handleScan(code) {
    scanning = true;
    error = '';
    scanResult = null;

    try {
      const result = await api('/qr/scan', {
        method: 'POST',
        body: JSON.stringify({ code }),
      });
      scanResult = result;
    } catch (e) {
      error = e.message;
    } finally {
      scanning = false;
    }
  }

  function submitManualCode() {
    if (manualCode.trim()) {
      handleScan(manualCode.trim());
    }
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
  </div>
</nav>

<div class="container">
  <h1>📷 Scan QR Code</h1>

  <div class="card" style="max-width: 500px; margin: 0 auto;">
    <h3 style="margin-bottom: 1rem;">Enter QR Code</h3>
    <p style="color: var(--text-muted); margin-bottom: 1rem;">
      Scan a QR code with your device camera, or enter the code manually below.
    </p>

    <div id="qr-reader" style="width: 100%; margin-bottom: 1rem; border-radius: 8px; overflow: hidden; background: var(--bg-input); min-height: 200px; display: flex; align-items: center; justify-content: center;">
      <p style="color: var(--text-muted);">📷 Camera QR scanning<br><small>(requires HTTPS and camera permissions)</small></p>
    </div>

    <form on:submit|preventDefault={submitManualCode}>
      <label for="manual-code">Or enter code manually:</label>
      <input
        id="manual-code"
        type="text"
        bind:value={manualCode}
        placeholder="Enter QR code value..."
      />
      <button class="btn btn-primary" style="width: 100%;" type="submit" disabled={scanning}>
        {#if scanning}
          Validating...
        {:else}
          Submit Code
        {/if}
      </button>
    </form>
  </div>

  {#if error}
    <div class="card" style="border-color: var(--danger); max-width: 500px; margin: 1rem auto;">
      <p style="color: var(--danger);">❌ {error}</p>
    </div>
  {/if}

  {#if scanResult}
    <div class="card" style="max-width: 500px; margin: 1rem auto; border-color: {scanResult.valid ? 'var(--success)' : 'var(--danger)'};">
      {#if scanResult.valid}
        <h3 style="color: var(--success);">✅ Scan Successful!</h3>
        <p>Mission: <strong>{scanResult.mission?.title || 'Unknown'}</strong></p>
        <p style="color: var(--secondary);">XP earned: +{scanResult.mission?.xp_reward || 0}</p>
      {:else}
        <h3 style="color: var(--danger);">❌ Scan Failed</h3>
        <p style="color: var(--text-muted);">{scanResult.message}</p>
      {/if}
    </div>
  {/if}
</div>
