# Crisis Compass — Frontend

React + Vite + TypeScript + Tailwind + Framer Motion. Day 1-4 scope: landing page and the
AI Emergency Assistant flow, wired to the backend.

## Setup (PowerShell)

```powershell
cd frontend
npm install
copy .env.example .env
```

`.env` defaults to `VITE_API_URL=http://localhost:8000`, which matches the backend's default port.

## Run

```powershell
npm run dev
```

Open http://localhost:5173. The backend must be running for the `/assistant` page to return
real plans (see backend/README.md).

## Structure

```
src/
  components/   # RiskBadge, Loader, AIChat (the core assistant UI)
  pages/        # Home (landing), Assistant
  services/     # api.ts -> axios client + getEmergencyPlan()
  types/        # emergency.ts -> mirrors the backend Pydantic schema
```

## What's built so far

- Landing page hero + feature cards (Day 4 task, pulled forward)
- `/assistant`: free-text input -> POST `/api/assistant/plan` -> renders danger badge +
  four cards (immediate actions, things to carry, nearby help, safety tips)

## Not built yet (per the 12-day plan)

- Auth (login/register), Dashboard, Map, Preparedness checklist, Profile — these are Days 5-10.
