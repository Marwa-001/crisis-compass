import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { TOKEN_STORAGE_KEY } from "../services/api";
import { getProfile, loginUser, registerUser } from "../services/auth";
import type { LoginPayload, RegisterPayload, UserProfile } from "../types/auth";

interface AuthContextValue {
  user: UserProfile | null;
  loading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = useCallback(async () => {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!token) {
      setUser(null);
      return;
    }
    try {
      const profile = await getProfile();
      setUser(profile);
    } catch {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    refreshProfile().finally(() => setLoading(false));
  }, [refreshProfile]);

  async function login(payload: LoginPayload) {
    const { access_token } = await loginUser(payload);
    localStorage.setItem(TOKEN_STORAGE_KEY, access_token);
    await refreshProfile();
  }

  async function register(payload: RegisterPayload) {
    const { access_token } = await registerUser(payload);
    localStorage.setItem(TOKEN_STORAGE_KEY, access_token);
    await refreshProfile();
  }

  function logout() {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, refreshProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}