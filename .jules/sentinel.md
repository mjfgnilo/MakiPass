## 2024-05-18 - Missing Authorization Guard on Admin QR Endpoint
**Vulnerability:** The `getAllQrCodes()` endpoint in `QrController` was only protected by `AuthGuard('jwt')` but not `AdminGuard`, exposing all active QR codes to any authenticated player.
**Learning:** This codebase uses the Service Role Key for Supabase by default, bypassing database-level Row Level Security (RLS). Thus, role-based access control MUST be strictly enforced at the NestJS controller and service levels.
**Prevention:** Always verify that endpoints intended for administrative use have the proper role guard (`AdminGuard` or `ValidatorGuard`) applied in addition to `AuthGuard`.
