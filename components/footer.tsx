export function Footer() {
  return (
    <footer className="border-t border-line mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span
            className="grid place-items-center w-6 h-6 rounded-md font-bold text-[#04120c] text-xs"
            style={{ background: "linear-gradient(180deg,#45ffba,var(--neon))" }}
          >
            h
          </span>
          <span className="mono text-xs text-muted tracking-wider">HUDI — Asian equity perpetuals</span>
        </div>
        <p className="mono text-[11px] text-muted text-center">
          Prototype · illustrative data only · not financial advice · points subject to review
        </p>
        <div className="flex items-center gap-4 mono text-xs text-muted">
          <span className="navlink">Docs</span>
          <span className="navlink">X</span>
          <span className="navlink">Telegram</span>
        </div>
      </div>
    </footer>
  );
}
