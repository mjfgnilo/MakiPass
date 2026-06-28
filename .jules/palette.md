## 2024-05-15 - Svelte Form Submission Accessibility
**Learning:** Svelte interactive manual inputs (like QR codes) require wrapping in a `<form on:submit|preventDefault={handler}>` to natively support 'Enter to submit'. Without this, users are forced to click the submit button.
**Action:** Always wrap interactive manual inputs and their submit buttons in a form element rather than relying on `on:click` handlers for accessibility and better UX.
