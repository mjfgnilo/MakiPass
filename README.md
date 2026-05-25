# MakiPass

🎮 A QR-Driven Battlepass Application that gamifies physical and digital interactions through a tiered reward system. Progression is driven by scanning location-based or event-specific QR codes.

## Features

### Player (User) Side
- **Google OAuth login** via Supabase authentication
- **View missions** — browse available daily, weekly, and event missions
- **Scan QR codes** — validate codes to complete missions and earn XP
- **Battlepass progression** — track XP, unlock tiers, and claim rewards

### Administrator Side
- **Separate login portal** with username/password credentials
- **Dashboard** — overview of players, missions, and scan statistics
- **Mission management** — full CRUD for missions (scan, chain, location, daily, weekly types)
- **QR code generation** — create static or rotating (chain) QR codes
- **Tier management** — configure battlepass tiers with XP requirements and rewards

### Validator (Moderator) Side
- **Scan verification** — approve or reject pending scan submissions
- **Fraud detection** — review flagged/anomalous scanning patterns
- **Validation stats** — monitor pending, approved, and rejected counts

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend/API | [NestJS](https://nestjs.com/) (Node.js) |
| Frontend | [SvelteKit](https://kit.svelte.dev/) |
| Database | [Supabase](https://supabase.com/) (PostgreSQL) |
| Auth (Players) | Google OAuth 2.0 via Supabase |
| Auth (Admins) | Username/password with bcrypt + JWT |
| QR Generation | `qrcode` library |
| Deployment | [Render](https://render.com/) |

## Repository Layout

```text
/backend       # NestJS API server
/frontend      # SvelteKit web application (player + admin + validator)
/database      # SQL schema and seed scripts
render.yaml    # Render deployment blueprint
```

## Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x
- A **Supabase** project (free tier works)
- **Google Cloud** OAuth credentials (for player login)

## Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/mjfgnilo/MakiPass.git
cd MakiPass
```

### 2. Set Up Supabase Database

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** in your Supabase dashboard
3. Copy and run the contents of `database/schema.sql`
4. This creates all required tables and a default admin user

### 3. Configure Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials (Web application type)
3. Add authorized redirect URI: `https://<your-supabase-ref>.supabase.co/auth/v1/callback`
4. In Supabase: **Authentication → Providers → Google** — enable and paste Client ID/Secret

### 4. Backend Setup

```bash
cd backend
cp .env.example .env
# Edit .env with your Supabase and OAuth credentials
npm install
npm run build
npm run start:dev   # Development mode with hot-reload
```

The API server runs on `http://localhost:3000` by default.

### 5. Frontend Setup

```bash
cd frontend
cp .env.example .env
# Edit .env with your Supabase public keys and API URL
npm install
npm run dev         # Development mode
```

The frontend runs on `http://localhost:5173` by default.

### 6. Create Admin Account

Option A — Use the seed script:
```bash
cd database
# Requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars
node seed-admin.js <username> <password> <role>
# Example:
node seed-admin.js admin admin123 admin
node seed-admin.js validator1 pass456 validator
```

Option B — The SQL schema includes a default admin user:
- **Username:** `admin`
- **Password:** `admin123`
- ⚠️ Change this immediately in production!

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description |
|----------|-------------|
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side only) |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `JWT_SECRET` | Secret key for signing app JWTs |
| `PORT` | Server port (default: 3000) |

### Frontend (`frontend/.env`)

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous/public key |
| `VITE_API_URL` | Backend API URL (default: `http://localhost:3000/api`) |

## Deployment (Render)

This repository includes `render.yaml` for one-click deployment:

1. Push the repository to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click **New → Blueprint** and connect this repository
4. Render will detect `render.yaml` and create both services:
   - **`makipass-api`** — NestJS backend on `/backend`
   - **`makipass-web`** — SvelteKit frontend on `/frontend`
5. Set the environment variables in each service's settings

### Services

| Service | Root Dir | Build Command | Start Command |
|---------|----------|---------------|---------------|
| makipass-api | `backend` | `npm ci && npm run build` | `npm run start:prod` |
| makipass-web | `frontend` | `npm ci && npm run build` | `npm run preview -- --host 0.0.0.0 --port $PORT` |

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Player login (exchange Supabase token) |
| POST | `/api/auth/admin/login` | Admin/Validator login (username/password) |
| GET | `/api/auth/me` | Get current user profile |

### Missions
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/missions` | List all missions |
| GET | `/api/missions/:id` | Get mission details |
| GET | `/api/missions/player/my` | Get player's missions |
| POST | `/api/missions/player/complete/:id` | Complete a mission |

### QR Codes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/qr/scan` | Validate a scanned QR code |
| GET | `/api/qr` | List all QR codes (admin) |

### Battlepass
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/battlepass/tiers` | Get all tiers |
| GET | `/api/battlepass/progress` | Get player progress |
| POST | `/api/battlepass/claim/:tier` | Claim a tier reward |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/dashboard` | Dashboard statistics |
| GET | `/api/admin/scan-logs` | View scan activity logs |
| POST | `/api/admin/missions` | Create a mission |
| PUT | `/api/admin/missions/:id` | Update a mission |
| DELETE | `/api/admin/missions/:id` | Delete a mission |
| POST | `/api/admin/qr/generate/:missionId` | Generate static QR |
| POST | `/api/admin/qr/generate-chain/:missionId` | Generate rotating QR |
| POST | `/api/admin/tiers` | Create a battlepass tier |

### Validator
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/validator/pending` | Get pending scans |
| GET | `/api/validator/flagged` | Get flagged scans |
| GET | `/api/validator/stats` | Get validation statistics |
| POST | `/api/validator/approve/:scanId` | Approve a scan |
| POST | `/api/validator/reject/:scanId` | Reject a scan |

## Application Routes (Frontend)

| Route | Description |
|-------|-------------|
| `/` | Home page — portal selection |
| `/player` | Player login (Google OAuth) |
| `/player/missions` | Browse and track missions |
| `/player/scan` | QR code scanner |
| `/player/battlepass` | View XP progress and tiers |
| `/admin/login` | Admin login (username/password) |
| `/admin` | Admin dashboard |
| `/admin/missions` | Mission CRUD management |
| `/admin/qr` | QR code generation |
| `/admin/tiers` | Battlepass tier configuration |
| `/validator` | Scan verification interface |

## License

This project is proprietary. All rights reserved.
