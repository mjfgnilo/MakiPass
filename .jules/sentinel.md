## 2026-06-22 - [Hardcoded JWT Secret Fallback]
**Vulnerability:** A hardcoded fallback secret ('dev-secret-change-me') was present in 'auth.module.ts' and 'jwt.strategy.ts' when process.env.JWT_SECRET was undefined.
**Learning:** Developers often add fallback secrets for local testing convenience. However, if deployed without the environment variable, the application continues to run silently using a weak, easily guessable secret, leading to authentication bypass or token forgery.
**Prevention:** Avoid fallback secrets completely in code. Instead, fail securely by explicitly throwing an error at startup if required security environment variables are missing. This ensures misconfigurations are caught immediately.
