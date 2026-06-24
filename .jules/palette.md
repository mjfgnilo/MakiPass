
## 2024-05-18 - Enter to Submit Missing in Interactive Inputs
**Learning:** Found an instance in `frontend/src/routes/player/scan/+page.svelte` where a manual input field paired with a button lacked a `<form>` wrapper, making it inaccessible via the Enter key and requiring a mouse click.
**Action:** Always wrap interactive inputs and buttons in `<form on:submit|preventDefault={handler}>` with a `type="submit"` button to natively support keyboard accessibility.
