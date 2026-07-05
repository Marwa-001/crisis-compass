import os

from langchain_groq import ChatGroq
from langchain_core.output_parsers import PydanticOutputParser
from langchain_core.prompts import ChatPromptTemplate

from models.emergency import EmergencyPlan, EmergencyRequest

MODEL_NAME = "llama-3.3-70b-versatile"

_parser = PydanticOutputParser(pydantic_object=EmergencyPlan)

_SYSTEM_PROMPT = """You are the AI Emergency Assistant inside Crisis Compass, a disaster preparedness app.
A user has described an emergency situation. Produce a calm, practical, and specific response.

Rules:
- danger_level must be exactly one of: low, moderate, high, critical.
- immediate_actions: 3-6 concrete steps, ordered by urgency, in plain language.
- things_to_carry: 3-8 items relevant to this specific situation (adjust for any medical conditions given).
- nearby_help: 2-5 realistic types of help or contacts (e.g. "local fire department", "nearest hospital", "district disaster helpline"). Do not invent specific phone numbers or shelter names.
- safety_tips: 2-5 short, situation-specific tips distinct from immediate_actions.
- Keep every list item under ~15 words.

{format_instructions}"""

_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", _SYSTEM_PROMPT),
        (
            "human",
            "Situation: {situation}\n"
            "Medical conditions to account for: {medical_conditions}\n"
            "Location: {location_hint}",
        ),
    ]
).partial(format_instructions=_parser.get_format_instructions())


def _get_llm() -> ChatGroq:
    api_key = os.environ.get("GROQ_API_KEY")
    if not api_key:
        raise RuntimeError(
            "GROQ_API_KEY is not set. Add it to backend/.env (see .env.example)."
        )
    return ChatGroq(model=MODEL_NAME, api_key=api_key, temperature=0.3)


def generate_emergency_plan(request: EmergencyRequest) -> EmergencyPlan:
    llm = _get_llm()
    chain = _prompt | llm | _parser

    return chain.invoke(
        {
            "situation": request.situation,
            "medical_conditions": ", ".join(request.medical_conditions) or "none reported",
            "location_hint": request.location_hint or "not provided",
        }
    )
