## 2024-06-24 - Svelte Rendering Bottlenecks
**Learning:** Svelte `{#each}` blocks can suffer from O(N^2) rendering bottlenecks when helper functions evaluated during rendering use O(M) array methods like `.some()`.
**Action:** Pre-compute derived state outside the rendering loop using Svelte's reactive declarations (`$:`) with O(1) lookups (like `Set`) instead.
