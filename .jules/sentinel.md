## 2026-06-19 - Fix Authorization Bypass in Admin View

**Vulnerability:** The `GET /qr` endpoint in `backend/src/qr/qr.controller.ts` was intended as an admin view but was only protected by `AuthGuard('jwt')` without an additional role check (like `AdminGuard`). This allowed any authenticated user to access all QR codes.
**Learning:** Endpoints meant for administrative or privileged access must explicitly verify the user's role, not just their authentication status. Relying solely on `AuthGuard('jwt')` in NestJS only guarantees the user is logged in, but does not prevent authorization bypass.
**Prevention:** Always verify that an endpoint explicitly applies the appropriate authorization guard (e.g., `@UseGuards(AuthGuard('jwt'), AdminGuard)`) when it returns sensitive data or performs administrative actions.
