## 2024-05-28 - Missing Form Wrappers Prevent Native Submissions
**Learning:** Interactive manual inputs in Svelte need to be wrapped in `<form on:submit|preventDefault>` to natively support pressing 'Enter' to submit, which is crucial for keyboard accessibility.
**Action:** Always wrap manual inputs and their corresponding submission buttons in a form with a preventDefault submit handler to ensure expected keyboard behavior.
