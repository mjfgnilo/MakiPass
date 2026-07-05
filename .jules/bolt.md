## 2026-07-05 - Pre-computing state outside loops in Svelte
**Learning:** Using array methods like `.some()` or `.find()` inside helper functions that are evaluated during Svelte `{#each}` rendering causes an O(N*M) bottleneck, as the array is re-scanned for every item in the loop.
**Action:** Pre-compute derived state (e.g., using a `Set` for O(1) lookups) outside the loop using Svelte's reactive declarations (`$:`) instead of computing it dynamically inside the template loop.
