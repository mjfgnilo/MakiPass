## 2024-05-24 - Pre-compute derived state outside Svelte `{#each}` loops
**Learning:** Using array methods like `.some()` or `.find()` inside a helper function that is called from a Svelte `{#each}` loop block creates an O(N^2) rendering bottleneck as the collection grows.
**Action:** Use Svelte's reactive declarations (`$:`) to pre-compute derived state (such as an O(1) `Set` for quick lookups) outside of the render loop.
