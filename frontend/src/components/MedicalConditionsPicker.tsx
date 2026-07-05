import { MEDICAL_CONDITION_PRESETS } from "../types/auth";

interface Props {
  selected: string[];
  onChange: (next: string[]) => void;
}

export default function MedicalConditionsPicker({ selected, onChange }: Props) {
  const otherEntries = selected.filter((c) => !MEDICAL_CONDITION_PRESETS.includes(c));
  const otherText = otherEntries.join(", ");

  function togglePreset(condition: string) {
    if (selected.includes(condition)) {
      onChange(selected.filter((c) => c !== condition));
    } else {
      onChange([...selected, condition]);
    }
  }

  function handleOtherChange(value: string) {
    const presetSelections = selected.filter((c) => MEDICAL_CONDITION_PRESETS.includes(c));
    const others = value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    onChange([...presetSelections, ...others]);
  }

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-base">
        Medical conditions <span className="font-normal text-base/50">(optional)</span>
      </label>
      <div className="flex flex-wrap gap-2">
        {MEDICAL_CONDITION_PRESETS.map((condition) => {
          const active = selected.includes(condition);
          return (
            <button
              type="button"
              key={condition}
              onClick={() => togglePreset(condition)}
              className={`rounded-full border px-3 py-1 text-xs transition ${
                active
                  ? "border-action bg-action/10 text-action"
                  : "border-base/15 text-base/70 hover:border-action/40"
              }`}
            >
              {condition}
            </button>
          );
        })}
      </div>
      <input
        type="text"
        value={otherText}
        onChange={(e) => handleOtherChange(e.target.value)}
        placeholder="Other conditions, comma separated"
        className="mt-2 w-full rounded-xl border border-base/15 bg-white p-3 text-sm outline-none transition focus:border-action focus:ring-2 focus:ring-action/20"
      />
    </div>
  );
}