## 2026-06-16 - Wrap Inputs in Forms for Better Accessibility
**Learning:** Manual form inputs (like QR code entry) that are missing a wrapping `<form>` do not support "Enter" key to submit natively, which hinders keyboard accessibility and UX. Also, button disabled states should prevent submitting empty values.
**Action:** Always wrap interactive input and submission button pairs in a `<form on:submit|preventDefault={handler}>` component to natively enable "Enter to submit" behaviour and easily manage submission events.
