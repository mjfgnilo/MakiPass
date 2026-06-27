## 2024-05-24 - Svelte Reactive Set for O(N^2) Mitigation
**Learning:** Using array methods like `.some()` inside helper functions evaluated during Svelte rendering in `{#each}` blocks can create severe O(N^2) bottlenecks when rendering long lists against another data source.
**Action:** Always pre-compute derived state (e.g., using a `Set` for O(1) lookups) outside the loop using Svelte's reactive declarations (`$:`) rather than re-evaluating for every item during rendering.
