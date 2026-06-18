import { VENUES, HOLIDAYS } from "@/lib/admin-hudi-data";
import { AdminHeader, Pill, Panel } from "@/components/admin-ui";
import { Toggle } from "@/components/toggle";

export default function SessionsPage() {
  return (
    <div>
      <AdminHeader
        title="Sessions / Trading calendar"
        desc="Hudi trades Asian equities — markets open and close. Manage venue hours, lunch breaks, half-days and holidays, and the off-hours reduce-only → settlement transition."
        actions={<button className="btn-neon">+ Add holiday</button>}
      />

      <div className="card p-4 mb-6" style={{ borderColor: "rgba(255,202,95,.3)", background: "radial-gradient(500px 140px at 0% 0%, rgba(255,202,95,.08), transparent 70%), linear-gradient(180deg,var(--surface-2),var(--surface))" }}>
        <span className="mono text-xs text-gold">⚠ Session state is the single source of truth for the open/close badge across the app. Drift here causes the H-34 / H-39 / H-63 inconsistencies.</span>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {VENUES.map((v) => (
          <div key={v.venue} className="card p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{v.venue}</div>
                <div className="mono text-[11px] text-muted">{v.tz}</div>
              </div>
              <Pill k={v.status === "Open" ? "Live" : v.status === "Closed" ? "down" : "medium"}>{v.status}</Pill>
            </div>
            <div className="mt-3 mono text-xs text-muted">{v.hours}</div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-sm">Local <span className="tabular">{v.localTime}</span></span>
              <span className="mono text-xs text-muted">{v.nextChange}</span>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-line">
              <div>
                <div className="text-sm">Reduce-only (off-hours)</div>
                <div className="mono text-[11px] text-muted">{v.markets} markets</div>
              </div>
              <Toggle initial={v.reduceOnly} />
            </div>
            {v.note && <div className="mono text-[11px] text-pink mt-3">{v.note}</div>}
            <div className="flex gap-2 mt-4">
              <button className="btn-ghost !py-1.5 !px-3 !text-[11px]">Edit hours</button>
              <button className="btn-ghost !py-1.5 !px-3 !text-[11px]" style={{ color: "var(--pink)", borderColor: "rgba(255,92,147,.4)" }}>Emergency halt</button>
            </div>
          </div>
        ))}
      </div>

      <Panel title="Upcoming holidays & half-days">
        <table className="tbl">
          <thead>
            <tr><th>Date</th><th>Venue</th><th>Name</th><th>Type</th><th></th></tr>
          </thead>
          <tbody>
            {HOLIDAYS.map((h, i) => (
              <tr key={i} className="row-hover">
                <td className="mono text-sm">{h.date}</td>
                <td><Pill k={h.venue}>{h.venue}</Pill></td>
                <td>{h.name}</td>
                <td><Pill k={h.type === "Half day" ? "medium" : "down"}>{h.type}</Pill></td>
                <td className="text-right"><button className="btn-ghost !py-1.5 !px-3 !text-[11px]">Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}
