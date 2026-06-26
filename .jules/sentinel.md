## 2024-05-15 - Hardcoded Secrets in Config
**Vulnerability:** Found hardcoded fallback for JWT_SECRET in NestJS auth module and strategy which would be silently used if env var is missing in prod.
**Learning:** Hardcoded fallbacks in configuration allow services to start insecurely instead of failing fast, creating hidden critical vulnerabilities.
**Prevention:** Use strict error throwing during module configuration (e.g. `registerAsync` in NestJS) if required security environment variables are missing.
