## 2023-10-24 - Svelte List Rendering O(N^2) Anti-Pattern
**Learning:** Found a specific anti-pattern in the Svelte frontend where helper functions used in `{#each}` blocks perform array scans (e.g., `Array.some()`). Since Svelte re-evaluates the helper function for every item in the list, an O(M) operation inside the helper becomes an O(N*M) operation overall during rendering.
**Action:** Always pre-compute derived state (like a `Set` for O(1) lookups) using Svelte's reactive declarations (`$:`) outside of `{#each}` blocks instead of doing array lookups inside them.
