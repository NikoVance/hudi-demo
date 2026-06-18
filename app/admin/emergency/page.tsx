import { EMERGENCY } from "@/lib/admin-data";
import { AdminHeader } from "@/components/admin-ui";
import { Toggle } from "@/components/toggle";

export default function EmergencyPage() {
  return (
    <div>
      <AdminHeader title="Emergency controls" desc="Global kill-switches. Changes are logged to the audit trail and may require a second approver." />

      <div className="card p-5 mb-6" style={{ borderColor: "rgba(255,92,147,.3)", background: "radial-gradient(500px 140px at 0% 0%, rgba(255,92,147,.1), transparent 70%), linear-gradient(180deg,var(--surface-2),var(--surface))" }}>
        <div className="flex items-center gap-2">
          <span className="text-pink">⚠</span>
          <span className="mono text-xs" style={{ color: "var(--pink)" }}>These switches affect all users immediately. Use with care.</span>
        </div>
      </div>

      <div className="space-y-3">
        {EMERGENCY.map((e) => (
          <div key={e.key} className="card p-5 flex items-center justify-between gap-4">
            <div>
              <div className="font-medium flex items-center gap-2">
                {e.label}
                {e.paused && <span className="chip chip-pink">paused</span>}
              </div>
              <div className="text-muted text-sm mt-1">{e.desc}</div>
            </div>
            <Toggle initial={e.paused} />
          </div>
        ))}
      </div>
    </div>
  );
}
