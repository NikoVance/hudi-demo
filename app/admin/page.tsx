import Link from "next/link";
import { KPIS, VOLUME_7D, OI_BY_VENUE, WITHDRAWALS, AUDIT } from "@/lib/admin-data";
import { AdminHeader, Kpi, Panel } from "@/components/admin-ui";
import { Sparkline, COLOR } from "@/components/ui";

export default function AdminDashboard() {
  const oiTotal = OI_BY_VENUE.reduce((s, x) => s + x.value, 0);
  return (
    <div>
      <AdminHeader title="Dashboard" desc="Exchange health at a glance · last 24h" actions={<span className="chip">Updated just now</span>} />

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {KPIS.map((k) => (
          <Kpi key={k.label} {...k} />
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <Panel title="Volume — 7d ($M)">
          <div className="p-5">
            <div className="tabular text-3xl font-semibold mb-3">$48.2M <span className="mono text-xs text-neon">▲ 12.4%</span></div>
            <Sparkline data={VOLUME_7D} width={460} height={90} />
          </div>
        </Panel>

        <Panel title="Open interest by venue">
          <div className="p-5 space-y-3">
            {OI_BY_VENUE.map((v) => (
              <div key={v.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{v.label}</span>
                  <span className="tabular text-muted">${v.value.toFixed(1)}M · {Math.round((v.value / oiTotal) * 100)}%</span>
                </div>
                <div className="meter">
                  <span style={{ width: `${(v.value / oiTotal) * 100}%`, background: `linear-gradient(90deg, ${COLOR[v.color]}99, ${COLOR[v.color]})` }} />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Panel title="Pending withdrawals" actions={<Link href="/admin/withdrawals" className="navlink text-xs">View all →</Link>}>
          <table className="tbl">
            <tbody>
              {WITHDRAWALS.slice(0, 3).map((w) => (
                <tr key={w.id} className="row-hover">
                  <td className="mono text-xs">{w.id}</td>
                  <td className="mono">{w.user}</td>
                  <td className="tabular text-right">${w.amount.toLocaleString()}</td>
                  <td className="text-right"><span className="chip">{w.approvals}/{w.needed} · {w.tier}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <Panel title="Recent admin activity" actions={<Link href="/admin/audit" className="navlink text-xs">Audit log →</Link>}>
          <table className="tbl">
            <tbody>
              {AUDIT.slice(0, 4).map((a, i) => (
                <tr key={i} className="row-hover">
                  <td className="mono text-[11px] text-muted">{a.time.slice(5)}</td>
                  <td className="mono text-xs">{a.admin}</td>
                  <td><span className="chip chip-blue">{a.action}</span></td>
                  <td className="mono text-xs text-right text-muted">{a.resource}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </div>
    </div>
  );
}
