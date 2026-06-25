## 2024-05-18 - Svelte {#each} block O(N^2) bottleneck
**Learning:** In Svelte `{#each}` blocks, using array methods like `.some()` or `.find()` inside helper functions evaluated during rendering causes O(N^2) time complexity and rendering bottlenecks. The function runs on every render for every item.
**Action:** Pre-compute derived state using Svelte's reactive declarations (`$:`) outside the loop (e.g., using a `Set` for O(1) lookups), rather than evaluating functions inside the loop.
