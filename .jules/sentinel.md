## 2024-05-18 - Hardcoded Secret Fallbacks
**Vulnerability:** The application used a hardcoded fallback (`dev-secret-change-me`) for the JWT secret if the `JWT_SECRET` environment variable was not set.
**Learning:** Default or fallback secrets in production configurations are dangerous as they can lead to trivial token forging if the environment variable is accidentally omitted.
**Prevention:** Always fail fast and securely (throw an error on startup) if critical security environment variables like secrets or keys are missing.
