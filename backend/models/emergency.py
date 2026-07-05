from typing import Literal
from pydantic import BaseModel, Field


class EmergencyRequest(BaseModel):
    """What the frontend sends when a user describes their situation."""

    situation: str = Field(..., min_length=3, description="Free-text description of the emergency, e.g. 'there is smoke in my building'")
    medical_conditions: list[str] = Field(default_factory=list, description="Optional medical conditions from the user's profile, used to personalize the plan")
    location_hint: str | None = Field(default=None, description="Optional city/area name to make guidance location-aware")


class EmergencyPlan(BaseModel):
    """Structured output returned by the AI Emergency Assistant.

    This is the exact schema from the Crisis Compass implementation guide.
    """

    situation: str
    danger_level: Literal["low", "moderate", "high", "critical"]
    immediate_actions: list[str]
    things_to_carry: list[str]
    nearby_help: list[str]
    safety_tips: list[str]
