## 2024-05-24 - Enable 'Enter to Submit' via Form Wrappers
**Learning:** In SvelteKit applications, interactive manual inputs paired with a submission button should always be wrapped in a `<form on:submit|preventDefault={handler}>`. This natively enables 'Enter to submit' behavior, improving keyboard accessibility, without needing to explicitly listen for 'keypress' events on the input.
**Action:** Always check if a manual input + button pair lacks a `<form>` wrapper and add it to ensure basic keyboard accessibility.
