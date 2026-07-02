## 2024-05-24 - O(N^2) render complexity in Svelte block
**Learning:** Found an `isCompleted` helper calling `.some()` inside a Svelte `{#each}` loop in `frontend/src/routes/player/missions/+page.svelte`, resulting in O(N*M) rendering complexity.
**Action:** Compute derived state like a `completedMissionIds` Set outside the loop using Svelte's reactive declarations (`$:`) to achieve O(1) lookups during rendering.
