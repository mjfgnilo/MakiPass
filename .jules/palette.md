## 2024-05-24 - Enable Keyboard Submission for Form Inputs
**Learning:** Manual code entry fields without a `<form>` wrapper break native "Enter to submit" behavior, forcing users to click the button. This is a common accessibility/UX pitfall in Svelte components.
**Action:** Always wrap interactive manual inputs and their submission buttons in a `<form on:submit|preventDefault={handler}>` component in Svelte to natively enable "Enter to submit" behavior and manage submission events safely.
