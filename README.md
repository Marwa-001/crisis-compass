# Crisis Compass

AI-powered disaster preparedness and emergency response app. Built for Next Byte Hacks V3.

This scaffold covers **Day 1 through the start of Day 4** of the 12-day build plan:

- Day 1: repos scaffolded, `EmergencyPlan` Pydantic v2 schema defined exactly as specced
- Days 2-3: AI Emergency Assistant end to end (input -> Groq via LangChain -> structured
  response -> card UI)
- Day 4 (started): landing page hero + feature cards

See `backend/README.md` and `frontend/README.md` for setup. Quick start:

```powershell
# Terminal 1
cd backend
python -m venv venv
venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env   # then add your GROQ_API_KEY
uvicorn main:app --reload --port 8000

# Terminal 2
cd frontend
npm install
copy .env.example .env
npm run dev
```

Then visit http://localhost:5173, click "Try the AI Assistant", and describe a situation.

## What's next (Days 5-12 per the guide)

5. Auth: email/password + JWT, profile fields (medical conditions, blood group, emergency contact)
6-7. Dashboard: weather card, risk badge, shelter placeholder, Quick SOS button
8-9. Interactive Leaflet map with mock shelter/hospital data (clearly labeled as demo data)
10. Preparedness checklist with saved progress
11. Polish + deploy (Vercel + Render)
12. Buffer: demo prep, pitch narrative

Stretch only if day 10 finishes early: Community Help Board, AI Damage Analysis (image upload).
