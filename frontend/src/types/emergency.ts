export type DangerLevel = "low" | "moderate" | "high" | "critical";

export interface EmergencyRequest {
  situation: string;
  medical_conditions?: string[];
  location_hint?: string;
}

export interface EmergencyPlan {
  situation: string;
  danger_level: DangerLevel;
  immediate_actions: string[];
  things_to_carry: string[];
  nearby_help: string[];
  safety_tips: string[];
}
