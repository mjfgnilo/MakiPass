<script>
  import { onMount } from 'svelte';
  import { api } from '$lib/api.js';

  let progress = { xp: 0, current_tier: 0 };
  let tiers = [];
  let loading = true;
  let claimMessage = '';

  onMount(async () => {
    try {
      [progress, tiers] = await Promise.all([
        api('/battlepass/progress'),
        api('/battlepass/tiers'),
      ]);
    } catch (e) {
      console.error(e);
    } finally {
      loading = false;
    }
  });

  function getProgressPercent() {
    if (tiers.length === 0) return 0;
    const maxXp = tiers[tiers.length - 1]?.xp_required || 1;
    return Math.min((progress.xp / maxXp) * 100, 100);
  }

  async function claimReward(tierNumber) {
    try {
      const result = await api(`/battlepass/claim/${tierNumber}`, { method: 'POST' });
      if (result.success) {
        claimMessage = `🎉 Tier ${tierNumber} reward claimed!`;
      } else {
        claimMessage = result.message;
      }
    } catch (e) {
      claimMessage = e.message;
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
  <h1>🏆 Battlepass</h1>

  {#if loading}
    <p>Loading progress...</p>
  {:else}
    <div class="card mb-2">
      <div class="flex justify-between items-center mb-1">
        <h3>Your Progress</h3>
        <span style="color: var(--secondary); font-size: 1.5rem; font-weight: 700;">
          {progress.xp} XP
        </span>
      </div>
      <div class="progress-bar">
        <div class="fill" style="width: {getProgressPercent()}%"></div>
      </div>
      <p style="color: var(--text-muted); margin-top: 0.5rem;">
        Current Tier: <strong style="color: var(--primary);">{progress.current_tier}</strong>
      </p>
    </div>

    {#if claimMessage}
      <div class="card mb-1" style="border-color: var(--success);">
        <p>{claimMessage}</p>
      </div>
    {/if}

    <h2>Tiers</h2>
    {#if tiers.length === 0}
      <div class="card">
        <p style="color: var(--text-muted);">No tiers configured yet.</p>
      </div>
    {:else}
      {#each tiers as tier}
        <div class="card tier-card {tier.tier_number <= progress.current_tier ? 'unlocked' : ''} {tier.tier_number === progress.current_tier ? 'current' : ''}">
          <div style="flex: 1;">
            <h3>Tier {tier.tier_number}</h3>
            <p style="color: var(--text-muted);">{tier.reward_description}</p>
            <small style="color: var(--secondary);">{tier.xp_required} XP required</small>
          </div>
          <div>
            {#if tier.tier_number <= progress.current_tier}
              <button class="btn btn-success" on:click={() => claimReward(tier.tier_number)}>
                Claim
              </button>
            {:else}
              <span class="badge badge-warning">🔒 Locked</span>
            {/if}
          </div>
        </div>
      {/each}
    {/if}
  {/if}
</div>
