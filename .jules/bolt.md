## 2024-06-21 - Pre-computing Svelte Derived State to Prevent O(N^2) Rendering
**Learning:** Using array iteration methods like `.some()` or `.find()` inside Svelte `{#each}` block helper functions causes an O(N^2) rendering bottleneck as the collection grows. Svelte evaluates the helper function on every render for every item.
**Action:** Use Svelte's reactive declarations (`$:`) outside the loop to pre-compute derived state (e.g., using a `Set` for O(1) lookups) before rendering the list. This reduces the complexity to O(N).
