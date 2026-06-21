## 2024-06-21 - Native Form Submission

**Learning:** Wrapping input fields and buttons in `<form on:submit|preventDefault={handler}>` intrinsically handles "Enter to submit" functionality and screen reader form events better than using an `on:click` handler on a button. Svelte natively supports modifiers like `preventDefault` on these standard HTML events.
**Action:** Consistently use native `<form>` submission techniques across the application to enhance keyboard accessibility.
