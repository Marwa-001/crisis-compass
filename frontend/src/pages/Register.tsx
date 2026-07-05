import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BLOOD_GROUPS } from "../types/auth";
import MedicalConditionsPicker from "../components/MedicalConditionsPicker";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [conditions, setConditions] = useState<string[]>([]);
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register({
        name,
        email,
        password,
        blood_group: bloodGroup || undefined,
        medical_conditions: conditions,
        emergency_contact_name: contactName || undefined,
        emergency_contact_phone: contactPhone || undefined,
      });
      navigate("/profile");
    } catch (err: any) {
      setError(err?.response?.data?.detail ?? "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-canvas px-4 py-12">
      <div className="mx-auto max-w-md">
        <h1 className="font-display text-2xl font-bold text-base">Create your account</h1>
        <p className="mt-1 text-sm text-base/60">
          This helps Crisis Compass personalize your emergency plans.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-base">Name</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-base/15 bg-white p-3 text-sm outline-none focus:border-action focus:ring-2 focus:ring-action/20"
            />
          </div>
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
              minLength={6}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-base/15 bg-white p-3 text-sm outline-none focus:border-action focus:ring-2 focus:ring-action/20"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-base">Blood group</label>
            <select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="w-full rounded-xl border border-base/15 bg-white p-3 text-sm outline-none focus:border-action focus:ring-2 focus:ring-action/20"
            >
              <option value="">Prefer not to say</option>
              {BLOOD_GROUPS.map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
          </div>

          <MedicalConditionsPicker selected={conditions} onChange={setConditions} />

          <div>
            <label className="mb-1 block text-sm font-medium text-base">
              Emergency contact name <span className="font-normal text-base/50">(optional)</span>
            </label>
            <input
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className="w-full rounded-xl border border-base/15 bg-white p-3 text-sm outline-none focus:border-action focus:ring-2 focus:ring-action/20"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-base">
              Emergency contact phone <span className="font-normal text-base/50">(optional)</span>
            </label>
            <input
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              className="w-full rounded-xl border border-base/15 bg-white p-3 text-sm outline-none focus:border-action focus:ring-2 focus:ring-action/20"
            />
          </div>

          {error && <p className="text-sm text-danger">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-action py-3 font-display font-semibold text-white transition hover:bg-action/90 disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-base/60">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-action">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}