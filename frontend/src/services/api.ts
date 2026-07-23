import axios from "axios";
import type { EmergencyPlan, EmergencyRequest } from "../types/emergency";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? "http://localhost:8000" : "");

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const TOKEN_STORAGE_KEY = "crisis_compass_token";

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { TOKEN_STORAGE_KEY };

export async function getEmergencyPlan(
  payload: EmergencyRequest
): Promise<EmergencyPlan> {
  const { data } = await api.post<EmergencyPlan>("/api/assistant/plan", payload);
  return data;
}

export default api;
