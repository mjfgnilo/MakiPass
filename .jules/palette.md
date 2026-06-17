## 2024-06-17 - Enter-to-Submit Accessibility in Svelte

**Learning:** Svelte applications lacking native `<form>` wrappers around inputs and their corresponding `<button>` elements prevent users from natively using the "Enter" key to submit forms, creating an accessibility barrier and poor UX for keyboard users.
**Action:** Always wrap interactive manual inputs and their submission buttons in a `<form on:submit|preventDefault={handler}>` component in Svelte to natively enable 'Enter to submit' behavior and manage submission events safely.
