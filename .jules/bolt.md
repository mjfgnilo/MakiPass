## 2026-06-13 - O(N^2) rendering bottleneck in Svelte templates
**Learning:** Calling array iteration methods like .some() inside a Svelte each block creates an O(N^2) performance bottleneck when iterating over lists.
**Action:** Extract list lookups to a Set using a Svelte reactive declaration ($:) and check against the set inside the each block.
