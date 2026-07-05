export const MEDICAL_CONDITION_PRESETS = [
  "Asthma",
  "Diabetes",
  "Heart condition",
  "Epilepsy",
  "Mobility impairment",
  "Visual impairment",
  "Hearing impairment",
  "Pregnant",
  "Severe allergy",
];

export const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  blood_group: string | null;
  medical_conditions: string[];
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  blood_group?: string;
  medical_conditions?: string[];
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ProfileUpdatePayload {
  name?: string;
  blood_group?: string;
  medical_conditions?: string[];
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
}

export interface Token {
  access_token: string;
  token_type: string;
}