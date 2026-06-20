import { motion } from "motion/react";

const sparkline = "M0,80 L20,70 L40,75 L60,55 L80,60 L100,40 L120,48 L140,30 L160,38 L180,20 L200,28 L220,12 L240,18 L260,8 L280,16 L300,4";

const assets = [
  { sym: "BTC", name: "Bitcoin", pct: 42, color: "var(--gold)" },
  { sym: "ETH", name: "Ethereum", pct: 28, color: "rgba(255,255,255,0.9)" },
  { sym: "SOL", name: "Solana", pct: 14, color: "rgba(255,255,255,0.5)" },
  { sym: "Other", name: "Stables + L2", pct: 16, color: "rgba(255,255,255,0.25)" },
];

export function Dashboard() {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0, rotateX: 12 }}
      animate={{ y: 0, opacity: 1, rotateX: 0 }}
      transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="ticker-shadow relative mx-auto w-full max-w-[1100px] rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-5 backdrop-blur-xl sm:p-7"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-gold" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">Portfolio · Live</span>
        </div>
        <div className="font-mono text-xs text-white/40">AUR · USD · 09:42 UTC</div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="text-sm text-white/50">Total balance</div>
          <div className="mt-2 flex items-baseline gap-3">
            <div className="font-display text-5xl tracking-tight sm:text-6xl">$ 248,930.<span className="text-white/40">42</span></div>
            <span className="rounded-full bg-gold/15 px-2 py-1 font-mono text-xs text-gold">+12.4%</span>
          </div>

          <svg viewBox="0 0 300 90" className="mt-6 w-full">
            <defs>
              <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              d={`${sparkline} L300,90 L0,90 Z`}
              fill="url(#g1)"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.6 }}
            />
            <motion.path
              d={sparkline}
              fill="none"
              stroke="var(--gold)"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>

          <div className="mt-4 grid grid-cols-4 gap-2 font-mono text-[10px] uppercase tracking-wider text-white/40">
            <span>1D</span><span>1W</span><span>1M</span><span className="text-gold">1Y</span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
          <div className="text-xs uppercase tracking-[0.2em] text-white/40">Allocation</div>
          <div className="mt-4 space-y-3">
            {assets.map((a, i) => (
              <div key={a.sym}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/80">{a.name}</span>
                  <span className="font-mono text-white/60">{a.pct}%</span>
                </div>
                <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${a.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.4 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full"
                    style={{ background: a.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}