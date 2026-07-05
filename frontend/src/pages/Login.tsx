import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login({ email, password });
      navigate("/profile");
    } catch (err: any) {
      setError(err?.response?.data?.detail ?? "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-canvas px-4">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-2xl font-bold text-base">Welcome back</h1>
        <p className="mt-1 text-sm text-base/60">Log in to Crisis Compass.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-base">Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-base/15 bg-white p-3 text-sm outline-none focus:border-action focus:ring-2 focus:ring-action/20"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-base">Password</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-base/15 bg-white p-3 text-sm outline-none focus:border-action focus:ring-2 focus:ring-action/20"
            />
          </div>

          {error && <p className="text-sm text-danger">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-action py-3 font-display font-semibold text-white transition hover:bg-action/90 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-base/60">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-action">
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}