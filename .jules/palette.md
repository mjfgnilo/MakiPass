## 2024-07-01 - Enable Enter to Submit

**Learning:** Manual inputs not wrapped in a form require users to click the submit button, violating accessibility and common UX expectations. Wrapping interactive manual inputs and their submission buttons in a `<form on:submit|preventDefault={handler}>` natively enables "Enter to submit" behavior and manages submission events safely.
**Action:** Always wrap interactive manual inputs and their submission buttons in a `<form on:submit|preventDefault={handler}>` component in Svelte to natively enable 'Enter to submit' behavior.
