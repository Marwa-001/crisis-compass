# Crisis Compass — Backend

FastAPI + LangChain + Groq. Day 1-3 scope: health check + AI Emergency Assistant endpoint.

## Setup (PowerShell)

```powershell
cd backend
python -m venv venv
venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env
```

Edit `.env` and set `GROQ_API_KEY` (get one free at https://console.groq.com).

## Run

```powershell
uvicorn main:app --reload --port 8000
```

Then open http://127.0.0.1:8000/docs for the Swagger UI.

## Test the assistant endpoint

```powershell
$body = @{ situation = "there is smoke in my building" } | ConvertTo-Json
Invoke-RestMethod -Uri http://127.0.0.1:8000/api/assistant/plan -Method Post -Body $body -ContentType "application/json"
```

## Structure

```
backend/
  routers/        # assistant.py -> POST /api/assistant/plan
  models/         # emergency.py -> EmergencyRequest, EmergencyPlan (Pydantic v2)
  services/       # groq_service.py -> LangChain + Groq structured-output call
  db/             # (Day 5+) auth/user models go here
  main.py         # FastAPI app + CORS
```

## Python 3.14 note

If you're on Python 3.14 (Windows), `pip install -r requirements.txt` will fail on `numpy`
if you add the top-level `langchain` package, because `numpy<2.0.0` has no prebuilt wheel for
`cp314` and pip tries to compile it from source (requiring a C compiler you likely don't have).
This project only ever imports from `langchain_core` and `langchain_groq`, never top-level
`langchain`, so it's deliberately left out of `requirements.txt`. Don't add it back unless you
also need something like `langchain.agents` or `langchain.chains` — if you do, either add a
compiler toolchain or use a Python 3.11/3.12 venv instead.

## Notes

- `EmergencyPlan` schema matches the implementation guide exactly: `situation`, `danger_level`
  (`low`/`moderate`/`high`/`critical`), `immediate_actions`, `things_to_carry`, `nearby_help`,
  `safety_tips`.
- CORS is pre-configured for the Vite dev server at `http://localhost:5173`.
- Auth (JWT, day 5) and SQLite/Postgres wiring are intentionally not built yet, they come next.
