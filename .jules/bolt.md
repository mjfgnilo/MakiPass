## 2025-02-28 - O(N^2) Bottlenecks in Svelte `{#each}` rendering loops
**Learning:** Using array methods like `.some()` inside helper functions that are evaluated for every item in an `{#each}` block causes an O(N^2) bottleneck. In this app, checking if missions were completed during the render loop degraded performance.
**Action:** Use Svelte's reactive declarations (`$:`) outside of the render block to pre-compute derived state (e.g. into a `Set` for O(1) lookups), improving time complexity from O(N^2) to O(N).
