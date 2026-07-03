## 2026-07-03 - Form Wrappers for Native Submission
**Learning:** Manual inputs and their submission buttons that are not wrapped in `<form>` elements lack native 'Enter to submit' behavior, requiring users to click the button explicitly, which is poor UX and accessibility.
**Action:** Always wrap interactive manual inputs and their submission buttons in a `<form on:submit|preventDefault={handler}>` component in Svelte to natively enable 'Enter to submit' behavior and manage submission events safely.
