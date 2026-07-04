## 2024-05-24 - O(N^2) Rendering Bottlenecks in Svelte `{#each}` Loops
**Learning:** Using array methods like `.some()` inside helper functions evaluated during rendering (e.g., inside an `{#each}` block) causes an O(N^2) performance bottleneck.
**Action:** Pre-compute derived state using a `Set` for O(1) lookups outside the loop via Svelte's reactive declarations (`$:`).
