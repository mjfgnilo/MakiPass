## 2024-07-04 - Enable Enter-to-Submit via Form Wrapper
**Learning:** In Svelte, a standalone input with a button relying solely on `on:click` lacks native keyboard accessibility (submitting via 'Enter' key).
**Action:** Always wrap interactive manual inputs and their corresponding action buttons in a `<form on:submit|preventDefault={handler}>` component to natively enable standard 'Enter to submit' behavior, improving keyboard accessibility.
