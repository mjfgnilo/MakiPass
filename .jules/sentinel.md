## 2024-06-21 - Missing Authorization on Admin Endpoint in Mixed-Role Controller
**Vulnerability:** The `GET /qr` endpoint in `qr.controller.ts` (intended for admin view) only required a valid JWT token (`AuthGuard('jwt')`), allowing any authenticated player to retrieve all active QR codes for the game.
**Learning:** When creating controllers that mix player-facing endpoints (`/qr/scan`) and admin-facing endpoints (`/qr`), it's easy to miss role-based authorization checks (`AdminGuard`) on the admin endpoints, especially if the controller level only enforces authentication.
**Prevention:** Always explicitly define role guards (like `AdminGuard`) on endpoints that return sensitive system state or perform privileged actions, particularly in controllers that handle multiple user roles.
