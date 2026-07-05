import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FEATURES = [
  {
    title: "AI Emergency Assistant",
    body: "Describe your situation in plain words and get a personalized plan in seconds.",
    accent: "text-danger",
  },
  {
    title: "Safe routes & shelters",
    body: "See nearby shelters and hospitals on a live map when every minute counts.",
    accent: "text-action",
  },
  {
    title: "Preparedness checklist",
    body: "Build your go-bag and readiness plan before a crisis ever starts.",
    accent: "text-success",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-canvas">
      <section className="mx-auto flex max-w-4xl flex-col items-center px-4 pb-16 pt-24 text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-sm font-semibold uppercase tracking-widest text-action"
        >
          Crisis Compass
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 font-display text-4xl font-bold leading-tight text-base sm:text-5xl"
        >
          A flood warning just went out.
          <br />
          <span className="text-action">You'll know exactly what to do.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 max-w-xl text-base/70"
        >
          Describe what's happening. Crisis Compass turns it into a personalized
          evacuation plan, the nearest shelter, a safe route, and what to pack,
          built around your own medical needs.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <Link
            to="/assistant"
            className="inline-block rounded-xl bg-action px-6 py-3 font-display font-semibold text-white shadow-sm transition hover:bg-action/90"
          >
            Try the AI Assistant
          </Link>
        </motion.div>
      </section>

      <section className="mx-auto grid max-w-4xl gap-4 px-4 pb-24 sm:grid-cols-3">
        {FEATURES.map((f) => (
          <div key={f.title} className="rounded-2xl border border-base/10 bg-white p-6 shadow-sm">
            <h3 className={`font-display text-lg font-semibold ${f.accent}`}>{f.title}</h3>
            <p className="mt-2 text-sm text-base/70">{f.body}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
