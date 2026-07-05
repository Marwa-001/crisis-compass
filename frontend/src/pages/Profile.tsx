import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "../services/auth";
import { BLOOD_GROUPS } from "../types/auth";
import MedicalConditionsPicker from "../components/MedicalConditionsPicker";

export default function Profile() {
  const { user, loading, logout, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const [bloodGroup, setBloodGroup] = useState("");
  const [conditions, setConditions] = useState<string[]>([]);
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    if (user) {
      setBloodGroup(user.blood_group ?? "");
      setConditions(user.medical_conditions ?? []);
      setContactName(user.emergency_contact_name ?? "");
      setContactPhone(user.emergency_contact_phone ?? "");
    }
  }, [user]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      await updateProfile({
        blood_group: bloodGroup || undefined,
        medical_conditions: conditions,
        emergency_contact_name: contactName || undefined,
        emergency_contact_phone: contactPhone || undefined,
      });
      await refreshProfile();
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  if (loading || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-canvas">
        <p className="text-muted">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-canvas px-4 py-12">
      <div className="mx-auto max-w-md">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-white">{user.name}</h1>
            <p className="text-sm text-muted">{user.email}</p>
          </div>
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="text-sm font-medium text-danger"
          >
            Log out
          </button>
        </div>

        <form onSubmit={handleSave} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-white">Blood group</label>
            <select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-surface p-3 text-white text-sm outline-none focus:border-action focus:ring-2 focus:ring-action/20"
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
            <label className="mb-1 block text-sm font-medium text-white">
              Emergency contact name
            </label>
            <input
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-surface p-3 text-white text-sm outline-none focus:border-action focus:ring-2 focus:ring-action/20"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-white">
              Emergency contact phone
            </label>
            <input
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-surface p-3 text-white text-sm outline-none focus:border-action focus:ring-2 focus:ring-action/20"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-xl bg-action py-3 font-display font-semibold text-white transition hover:bg-action/90 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
          {saved && <p className="text-center text-sm text-success">Saved.</p>}
        </form>
      </div>
    </main>
  );
}