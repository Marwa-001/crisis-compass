from fastapi import APIRouter, HTTPException

from models.emergency import EmergencyPlan, EmergencyRequest
from services.groq_service import generate_emergency_plan

router = APIRouter(prefix="/api/assistant", tags=["assistant"])


@router.post("/plan", response_model=EmergencyPlan)
def create_emergency_plan(request: EmergencyRequest) -> EmergencyPlan:
    try:
        return generate_emergency_plan(request)
    except RuntimeError as exc:
        # Missing/invalid API key configuration
        raise HTTPException(status_code=500, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(
            status_code=502, detail=f"AI Emergency Assistant failed: {exc}"
        ) from exc
