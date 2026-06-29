## 2024-05-24 - Hardcoded JWT Secret Fallback
**Vulnerability:** The NestJS backend authentication module had a hardcoded fallback secret (`dev-secret-change-me`) for JWT signing and verification if `process.env.JWT_SECRET` was missing.
**Learning:** In a production environment, missing the environment variable would quietly fall back to the hardcoded secret, making all issued JWT tokens forgeable by attackers who know the default value.
**Prevention:** The application must fail fast and securely by explicitly throwing an error at startup if critical secrets like `JWT_SECRET` are not provided in the environment.
