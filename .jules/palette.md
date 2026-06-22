## 2024-06-22 - Wrap manual inputs in forms
**Learning:** Manual input fields with submission buttons that use `on:click` handlers do not support native form submission semantics (like hitting "Enter" to submit), degrading keyboard accessibility and UX.
**Action:** Always wrap interactive manual inputs and their submission buttons in a `<form on:submit|preventDefault={handler}>` component in Svelte to natively enable 'Enter to submit' behavior and manage submission events safely.
