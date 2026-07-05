from pydantic import BaseModel, EmailStr, Field

# Preset list shown in the frontend multi-select; users can also add free-text "other" entries.
MEDICAL_CONDITION_PRESETS = [
    "Asthma",
    "Diabetes",
    "Heart condition",
    "Epilepsy",
    "Mobility impairment",
    "Visual impairment",
    "Hearing impairment",
    "Pregnant",
    "Severe allergy",
]

BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]


class UserRegister(BaseModel):
    name: str = Field(..., min_length=1)
    email: EmailStr
    password: str = Field(..., min_length=6)
    blood_group: str | None = None
    medical_conditions: list[str] = Field(default_factory=list)
    emergency_contact_name: str | None = None
    emergency_contact_phone: str | None = None


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserProfile(BaseModel):
    id: int
    name: str
    email: EmailStr
    blood_group: str | None = None
    medical_conditions: list[str] = Field(default_factory=list)
    emergency_contact_name: str | None = None
    emergency_contact_phone: str | None = None

    model_config = {"from_attributes": True}


class UserProfileUpdate(BaseModel):
    name: str | None = None
    blood_group: str | None = None
    medical_conditions: list[str] | None = None
    emergency_contact_name: str | None = None
    emergency_contact_phone: str | None = None


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"