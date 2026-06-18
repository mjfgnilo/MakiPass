## 2024-06-18 - Svelte Form Submission Accessibility
**Learning:** Wrapping manual inputs and submit buttons in a `<form on:submit|preventDefault={handler}>` is critical for basic accessibility and UX. In Svelte, omitting this breaks the native "Enter to submit" behavior, which is a significant barrier for keyboard navigation.
**Action:** Always wrap interactive input groups that trigger a specific action (like scanning a QR code) in a `<form>` tag and bind the action to the `submit` event with `preventDefault`.
