## 2024-05-24 - Interactive Form Element Wrapper for Manual Entries
**Learning:** For inputs paired with an actionable submit button (like manual code entries), tying them solely to `on:click` handlers ignores keyboard users expecting the standard "Enter" key submission behavior.
**Action:** Always wrap manual code inputs and their submit buttons inside a `<form on:submit|preventDefault={handler}>` block with `type="submit"` on the button. This natively ensures keyboard "Enter to submit" functionality and provides a cleaner UX without manual `on:keydown` listeners.
