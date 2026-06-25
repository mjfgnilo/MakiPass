## 2024-06-25 - Native Form Submissions for Inputs
**Learning:** Wrapping manual text inputs and their associated submit buttons in a `<form on:submit|preventDefault={handler}>` in Svelte is a critical accessibility and UX requirement. It natively enables "Enter to submit" behavior and proper keyboard event handling without requiring custom `on:keydown` listeners.
**Action:** Always wrap interactive manual input combinations in standard HTML forms rather than attaching click handlers directly to standalone buttons.
