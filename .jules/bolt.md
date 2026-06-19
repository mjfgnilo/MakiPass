## 2026-06-19 - Prevent O(N^2) Bottlenecks in Svelte {#each} Blocks
**Learning:** Using array methods like `.some()` inside helper functions that are evaluated during rendering within a Svelte `{#each}` block can cause an O(N*M) performance bottleneck, as the helper is re-evaluated for every item in the loop.
**Action:** Always pre-compute derived state (e.g., using a `Set` for O(1) lookups) outside the loop using Svelte's reactive declarations (`$:`) to optimize rendering performance for lists.
