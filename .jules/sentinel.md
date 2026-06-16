## 2026-06-16 - CRITICAL: Hardcoded Fallback JWT Secret
**Vulnerability:** The backend had a hardcoded fallback secret (`dev-secret-change-me`) for JWT signing, enabling attackers to mint valid tokens if `JWT_SECRET` was omitted from the environment.
**Learning:** Fallback secrets meant for local development can easily slip into production if environmental variables are misconfigured or missing.
**Prevention:** Implement fail-secure patterns by explicitly checking for required security variables at startup and throwing a critical error if they are missing.
