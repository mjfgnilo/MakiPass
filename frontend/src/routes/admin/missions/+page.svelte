<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { api } from '$lib/api.js';
  import { user, isAuthenticated } from '$lib/auth.js';

  let missions = [];
  let loading = true;
  let showForm = false;
  let editingMission = null;

  let form = { title: '', description: '', xp_reward: 100, type: 'scan', starts_at: '', ends_at: '' };

  onMount(async () => {
    if (!$isAuthenticated || $user?.role !== 'admin') {
      goto('/admin/login');
      return;
    }
    await loadMissions();
  });

  async function loadMissions() {
    loading = true;
    try {
      missions = await api('/missions');
    } catch (e) {
      console.error(e);
    } finally {
      loading = false;
    }
  }

  async function saveMission() {
    try {
      if (editingMission) {
        await api(`/admin/missions/${editingMission.id}`, {
          method: 'PUT',
          body: JSON.stringify(form),
        });
      } else {
        await api('/admin/missions', {
          method: 'POST',
          body: JSON.stringify(form),
        });
      }
      showForm = false;
      editingMission = null;
      form = { title: '', description: '', xp_reward: 100, type: 'scan', starts_at: '', ends_at: '' };
      await loadMissions();
    } catch (e) {
      alert(e.message);
    }
  }

  async function deleteMission(id) {
    if (confirm('Delete this mission?')) {
      await api(`/admin/missions/${id}`, { method: 'DELETE' });
      await loadMissions();
    }
  }

  function editMission(mission) {
    editingMission = mission;
    form = { ...mission };
    showForm = true;
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
    <h1>📋 Mission Management</h1>
    <button class="btn btn-primary" on:click={() => { showForm = !showForm; editingMission = null; }}>
      {showForm ? 'Cancel' : '+ New Mission'}
    </button>
  </div>

  {#if showForm}
    <div class="card mb-2">
      <h3>{editingMission ? 'Edit Mission' : 'Create New Mission'}</h3>
      <form on:submit|preventDefault={saveMission}>
        <label for="title">Title <span class="text-danger">*</span></label>
        <input id="title" type="text" bind:value={form.title} required />

        <label for="description">Description</label>
        <textarea id="description" bind:value={form.description} rows="3"></textarea>

        <label for="xp_reward">XP Reward <span class="text-danger">*</span></label>
        <input id="xp_reward" type="number" bind:value={form.xp_reward} min="1" required />

        <label for="type">Type</label>
        <select id="type" bind:value={form.type}>
          <option value="scan">QR Scan</option>
          <option value="chain">Chain Mission</option>
          <option value="location">Location-based</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>

        <label for="starts_at">Start Date (optional)</label>
        <input id="starts_at" type="datetime-local" bind:value={form.starts_at} />

        <label for="ends_at">End Date (optional)</label>
        <input id="ends_at" type="datetime-local" bind:value={form.ends_at} />

        <button type="submit" class="btn btn-success">
          {editingMission ? 'Update' : 'Create'} Mission
        </button>
      </form>
    </div>
  {/if}

  {#if loading}
    <p>Loading missions...</p>
  {:else if missions.length === 0}
    <div class="card text-center">
      <p style="color: var(--text-muted);">No missions yet. Create one to get started!</p>
    </div>
  {:else}
    {#each missions as mission}
      <div class="card flex justify-between items-center">
        <div>
          <h3>{mission.title}</h3>
          <p style="color: var(--text-muted);">{mission.description}</p>
          <div class="flex gap-1 mt-1">
            <span class="badge badge-success">+{mission.xp_reward} XP</span>
            <span class="badge badge-warning">{mission.type}</span>
          </div>
        </div>
        <div class="flex gap-1">
          <button class="btn btn-secondary" style="padding: 0.4rem 0.8rem;" on:click={() => editMission(mission)}>Edit</button>
          <button class="btn btn-danger" style="padding: 0.4rem 0.8rem;" on:click={() => deleteMission(mission.id)}>Delete</button>
        </div>
      </div>
    {/each}
  {/if}
</div>
