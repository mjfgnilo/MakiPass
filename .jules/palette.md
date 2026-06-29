## 2024-11-23 - Always wrap inputs in form for Enter-to-Submit
**Learning:** Manual code entry forms built with an input and a button don't natively submit when the user presses 'Enter' unless they are wrapped in a `<form>` element. This reduces keyboard accessibility and introduces UX friction since users expect standard form interactions.
**Action:** Always wrap interactive manual inputs and their submission buttons in a `<form on:submit|preventDefault={handler}>` in Svelte to natively enable 'Enter to submit' behavior and manage submission events gracefully.
