## 2026-07-01 - Native Form Submission for Manual Input
**Learning:** Interactive manual inputs and their submission buttons should always be wrapped in a `<form on:submit|preventDefault={handler}>` component in Svelte. This natively enables 'Enter to submit' behavior and manages submission events safely, improving keyboard accessibility.
**Action:** Always wrap text inputs and submit buttons in a form element rather than relying solely on button `on:click` events.
