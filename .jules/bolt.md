## 2023-10-27 - Battlepass Tier Computation Loop
**Learning:** When computing Battlepass tiers based on XP, `getPlayerProgress` and `getTiers` sequential awaits can be optimized using `Promise.all` to reduce DB query latency. Also, since tiers are sorted ascending by `tier_number`, iterating backwards allows for breaking early, avoiding a full table scan in memory.
**Action:** Always check for independent async operations that can be run concurrently with `Promise.all`. For ordered data, consider backwards iteration if it allows an early exit.
