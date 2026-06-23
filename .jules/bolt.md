## 2024-05-24 - Avoid O(N^2) Bottlenecks in Svelte `{#each}` Blocks
**Learning:** Using array iteration methods like `.some()` or `.find()` inside a Svelte template's `{#each}` block to calculate state can lead to severe O(N^2) rendering bottlenecks, especially when checking membership against another array. This causes unnecessary computation on every render pass.
**Action:** Always pre-compute derived state (e.g., using a `Set` for O(1) lookups) outside the loop using Svelte's reactive declarations (`$:`) to ensure optimal rendering performance.
