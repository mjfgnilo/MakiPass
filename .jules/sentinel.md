## 2024-06-23 - Authorization Bypass in Mission Completion
**Vulnerability:** The `completeMission` API allowed any authenticated user to manually complete any mission, bypassing the QR scanning flow, due to a lack of server-side validation against scan logs.
**Learning:** Defaulting to client-side restrictions or assuming users follow intended UI flows (e.g., scanning a QR code first) leaves endpoints vulnerable to direct manipulation (IDOR/Auth bypass).
**Prevention:** Always perform server-side authorization checks for state-changing actions. For multi-step workflows, strictly validate prerequisite actions (like verifying a corresponding `scan_log` entry exists) before allowing the final action to succeed.
