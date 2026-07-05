## 2024-05-18 - Keyboard Accessibility for Manual Inputs
**Learning:** Interactive manual inputs and their corresponding submission buttons need to be wrapped in a `<form>` component to natively enable "Enter to submit" behavior (implicit submission) and manage submission events safely without relying solely on click events.
**Action:** Always wrap interactive manual inputs and their submission buttons in a `<form on:submit|preventDefault={handler}>` component in Svelte to natively enable 'Enter to submit' behavior and improve keyboard accessibility.
