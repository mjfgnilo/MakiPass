## 2024-03-24 - Hardware Scanner Input Handling
**Learning:** Hardware QR/barcode scanners act essentially like extremely fast keyboards that often append an "Enter" keystroke at the end of a scan.
**Action:** When implementing any text-based input intended for a hardware scanner fallback, always wrap the input and submit button in a standard `<form>` tag. This enables the implicit "Enter-to-submit" behavior and handles hardware scanner input seamlessly.
