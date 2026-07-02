## 2024-07-02 - Native Form Submission for Keyboard Accessibility
**Learning:** Manual text inputs with paired submission buttons should always be wrapped in `<form on:submit|preventDefault>` components rather than relying solely on `on:click` handlers. This natively enables the expected "Enter to submit" keyboard behavior out of the box, improving accessibility for screen readers and keyboard-only users.
**Action:** Always wrap interactive input and submission flows in `<form>` tags rather than loose generic buttons.
