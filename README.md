# MakiPass

A web and QR-based event pass application.

## Tech stack

- **Backend/API:** [NestJS](https://nestjs.com/) (Node.js)
- **Frontend/Admin Dashboard & Mobile Web Client:** [SvelteKit](https://kit.svelte.dev/)
- **Database/Auth:** [Supabase](https://supabase.com/) (PostgreSQL)
- **OAuth Provider:** Google OAuth 2.0
- **Deployment:** [Render](https://render.com/)

## Recommended repository layout

```text
/backend   # NestJS API
/frontend  # SvelteKit app (admin + client)
```

## Environment variables

Configure these values in Render (and locally in `.env` files):

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `JWT_SECRET`

## Google OAuth (Supabase)

1. Create OAuth credentials in Google Cloud Console.
2. In Supabase, enable **Auth → Providers → Google**.
3. Set authorized redirect URI to:
   - `https://<your-supabase-project-ref>.supabase.co/auth/v1/callback`
4. Copy `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` into Supabase and Render.

## Render deployment

This repository now includes `render.yaml` to bootstrap deployment with:

- **`makipass-api`** (NestJS web service)
- **`makipass-web`** (SvelteKit web service)

Update each service's `rootDir`, build command, and start command once `/backend` and `/frontend` are scaffolded.
