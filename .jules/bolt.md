## 2024-06-22 - [Frontend Svelte O(N²) Rendering Fix]
**Learning:** Calling array methods like `.some()` via a helper function inside a Svelte `{#each}` block evaluates on every render iteration, creating an O(N²) bottleneck for lists.
**Action:** Use Svelte's reactive declarations (`$:`) to pre-compute derived state (e.g., mapping to a `Set`) outside the loop, ensuring O(1) lookups during rendering.
