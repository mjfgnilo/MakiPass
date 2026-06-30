## 2026-06-30 - Svelte {#each} block O(N^2) rendering bottlenecks
**Learning:** To prevent O(N^2) rendering bottlenecks in Svelte `{#each}` blocks, using array methods like `.some()` inside helper functions evaluated during rendering is inefficient.
**Action:** Pre-compute derived state (e.g., using `Set` for O(1) lookups) using Svelte's reactive declarations (`$:`) outside the loop.
