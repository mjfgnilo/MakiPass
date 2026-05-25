<script>
  import { supabase } from '$lib/api.js';
</script>

<div class="container text-center" style="padding-top: 15vh;">
  <h1 style="font-size: 3rem; margin-bottom: 0.5rem;">
    🎮 <span style="color: var(--primary);">Maki</span>Pass
  </h1>
  <p style="color: var(--text-muted); margin-bottom: 3rem; font-size: 1.2rem;">
    QR-Driven Battlepass Application
  </p>

  <div class="grid" style="max-width: 600px; margin: 0 auto;">
    <a href="/player" class="card" style="text-decoration: none; text-align: center;">
      <h2>🎯 Player</h2>
      <p style="color: var(--text-muted);">Scan QR codes, complete missions, unlock rewards</p>
    </a>

    <a href="/admin/login" class="card" style="text-decoration: none; text-align: center;">
      <h2>⚙️ Admin</h2>
      <p style="color: var(--text-muted);">Manage missions, generate QR codes, view analytics</p>
    </a>

    <a href="/validator" class="card" style="text-decoration: none; text-align: center;">
      <h2>✅ Validator</h2>
      <p style="color: var(--text-muted);">Verify scans, detect fraud, moderate activity</p>
    </a>
  </div>
</div>
