import api from "./api";
import type {
  LoginPayload,
  ProfileUpdatePayload,
  RegisterPayload,
  Token,
  UserProfile,
} from "../types/auth";

export async function registerUser(payload: RegisterPayload): Promise<Token> {
  const { data } = await api.post<Token>("/api/auth/register", payload);
  return data;
}

export async function loginUser(payload: LoginPayload): Promise<Token> {
  const { data } = await api.post<Token>("/api/auth/login", payload);
  return data;
}

export async function getProfile(): Promise<UserProfile> {
  const { data } = await api.get<UserProfile>("/api/auth/me");
  return data;
}

export async function updateProfile(
  payload: ProfileUpdatePayload
): Promise<UserProfile> {
  const { data } = await api.put<UserProfile>("/api/auth/me", payload);
  return data;
}