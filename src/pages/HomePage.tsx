import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import {
  ArrowUpRight,
  ShieldCheck,
  Wallet,
  LineChart,
  Coins,
  Sparkles,
  Lock,
  Globe2,
  Plus,
  Minus,
  Send,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

import { Nav } from "@/components/site/Nav";
import { Counter } from "@/components/site/Counter";
import { Reveal } from "@/components/site/Reveal";
import { Dashboard } from "@/components/site/Dashboard";
import { AuthModal, type AuthMode } from "@/components/site/AuthModal";
import heroCoin from "@/assets/hero-coin.jpg";
import chartArt from "@/assets/chart-art.jpg";
import securityArt from "@/assets/security-art.jpg";
import portfolioArt from "@/assets/portfolio-art.jpg";

export default function HomePage() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const openAuth = (mode: AuthMode) => {
    setAuthMode(mode);
    setAuthOpen(true);
  };
  return (
    <div id="top" className="relative overflow-x-clip bg-ink text-white">
      <Nav onSignIn={() => openAuth("signin")} onSignUp={() => openAuth("signup")} />
      <Hero onSignUp={() => openAuth("signup")} />
      <Marquee />
      <Stats />
      <FeatureGrid />
      <Showcase />
      <Markets />
      <Security />
      <Journal />
      <Testimonials />
      <Faq />
      <ContactSection />
      <CTA onSignUp={() => openAuth("signup")} />
      <Footer />
      <AuthModal
        open={authOpen}
        mode={authMode}
        onClose={() => setAuthOpen(false)}
        onSwitch={setAuthMode}
      />
    </div>
  );
}

/* ---------------- HERO ---------------- */
function Hero({ onSignUp }: { onSignUp: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const dashY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const coinY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section ref={ref} className="relative pt-32 pb-24 sm:pt-40 sm:pb-32 grain">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-x-0 top-20 -z-0 mx-auto h-[600px] max-w-[1100px] rounded-full bg-[radial-gradient(closest-side,rgba(233,216,74,0.14),transparent_70%)] blur-2xl" />

      {/* Floating coin */}
      <motion.img
        src={heroCoin}
        alt=""
        aria-hidden
        width={1280}
        height={1280}
        style={{ y: coinY }}
        className="pointer-events-none absolute -right-32 top-10 -z-10 w-[420px] opacity-40 mix-blend-screen sm:-right-20 sm:top-20 sm:w-[560px] lg:right-10 lg:top-24 lg:w-[640px] lg:opacity-60"
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6">
        <div className="mx-auto max-w-4xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-white/70"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Issue Nº 014 · Winter 2026
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-display mt-8 text-[clamp(2.75rem,8vw,8rem)] font-light leading-[0.95] tracking-tight text-balance"
          >
            A new standard
            <span className="block italic text-gold">for crypto investing.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-8 max-w-xl text-balance text-base text-white/60 sm:text-lg"
          >
            Nova Ledger is the editorial home for serious digital asset investors -
            a wallet, a desk, and a vault, composed with the precision of a private bank.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <button
              onClick={onSignUp}
              className="group inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-medium text-ink transition hover:scale-[1.03]"
            >
              Open an account
              <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <a
              href="#platform"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm text-white/80 transition hover:bg-white/5"
            >
              Tour the platform
            </a>
          </motion.div>
        </div>

        <motion.div style={{ y: dashY }} className="relative mt-24">
          <Dashboard />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- MARQUEE ---------------- */
function Marquee() {
  const items = [
    "Bitcoin · 67,420.10 · +1.8%",
    "Ethereum · 3,842.55 · +2.4%",
    "Solana · 184.30 · +5.1%",
    "AUM · $4.2B",
    "Daily Vol · $812M",
    "Avalanche · 42.18 · +3.2%",
    "Chainlink · 18.92 · +1.1%",
    "Polygon · 0.94 · +0.7%",
  ];
  const stream = [...items, ...items];
  return (
    <section className="relative border-y border-white/10 bg-ink py-6">
      <div className="overflow-hidden">
        <div className="marquee flex w-max gap-12 whitespace-nowrap font-mono text-xs uppercase tracking-[0.25em] text-white/40">
          {stream.map((s, i) => (
            <span key={i} className="flex items-center gap-12">
              {s}
              <span className="h-1 w-1 rounded-full bg-gold" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- STATS ---------------- */
function Stats() {
  const stats = [
    { value: 4.2, prefix: "$", suffix: "B", decimals: 1, label: "Assets under management" },
    { value: 320000, suffix: "+", label: "Active investors" },
    { value: 142, label: "Countries served" },
    { value: 812, prefix: "$", suffix: "M", label: "Avg. daily volume" },
  ];
  return (
    <section id="platform" className="relative bg-ink py-32">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="border-l border-white/10 pl-6">
                <div className="font-display text-5xl font-light tracking-tight sm:text-6xl">
                  <Counter
                    to={s.value}
                    prefix={s.prefix ?? ""}
                    suffix={s.suffix ?? ""}
                    decimals={s.decimals ?? 0}
                  />
                </div>
                <div className="mt-3 text-sm text-white/50">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FEATURE GRID ---------------- */
function FeatureGrid() {
  return (
    <section className="relative bg-bone py-32 text-ink">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink/50">
              02 - The Platform
            </span>
            <h2 className="font-display mt-6 text-5xl font-light leading-[1.02] tracking-tight sm:text-7xl">
              Everything an investor needs.
              <span className="block italic text-ink/40">Nothing they don't.</span>
            </h2>
            <p className="mt-6 max-w-md text-ink/60">
              Eight precision instruments, composed into a single, editorial workspace.
              Move between wallet, desk, and vault without losing the thread.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="group h-full rounded-3xl border border-ink/10 bg-white p-7 transition hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-gold transition group-hover:rotate-6">
                    <f.icon className="size-5" />
                  </div>
                  <h3 className="font-display mt-6 text-2xl tracking-tight">{f.title}</h3>
                  <p className="mt-2 text-sm text-ink/60">{f.body}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const features = [
  { icon: Wallet, title: "Self-custody wallet", body: "Multi-chain wallet with hardware-grade key isolation and one-tap recovery." },
  { icon: LineChart, title: "Portfolio desk", body: "Allocation, performance, attribution and tax lots - all in one editorial view." },
  { icon: Coins, title: "Spot trading", body: "Deep liquidity, smart routing and institutional execution from a single window." },
  { icon: Sparkles, title: "Yield & staking", body: "Native staking on ETH, SOL, ATOM and DOT with transparent validator sets." },
  { icon: ShieldCheck, title: "Vault custody", body: "$500M insurance pool and SOC 2 Type II infrastructure for long-term holdings." },
  { icon: Globe2, title: "Global access", body: "Available in 142 countries with local fiat rails and tax-aware reporting." },
];

/* ---------------- SHOWCASE ---------------- */
function Showcase() {
  return (
    <section className="relative bg-ink py-32">
      <div className="mx-auto max-w-[1400px] space-y-32 px-6">
        <Reveal>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">03 - The Desk</span>
              <h3 className="font-display mt-6 text-5xl font-light leading-[1.05] tracking-tight sm:text-6xl">
                A trading desk you'd build for yourself.
              </h3>
              <p className="mt-6 max-w-md text-white/60">
                Spot, perpetuals and options across forty venues. Smart routing finds the
                best execution; your screen stays beautifully still.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-white/70">
                {["Aggregated liquidity from 40+ venues", "Sub-50ms routing latency", "Transparent fee schedule"].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <span className="mt-2 h-1 w-6 bg-gold" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
              className="overflow-hidden rounded-[28px] border border-white/10"
            >
              <img src={chartArt} alt="Editorial chart art" loading="lazy" width={1280} height={960} className="h-full w-full object-cover" />
            </motion.div>
          </div>
        </Reveal>

        <Reveal>
          <div className="grid items-stretch gap-6 lg:grid-cols-3">
            <div className="rounded-[28px] bg-gold p-10 text-ink lg:col-span-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em]">04 - The Vault</span>
              <h3 className="font-display mt-6 text-5xl font-light leading-[1.05] tracking-tight sm:text-7xl">
                Hold for the long arc of the cycle.
              </h3>
              <p className="mt-6 max-w-xl text-ink/70">
                A cold-storage vault for conviction holdings, insured to $500M and
                audited quarterly by Trail of Bits and Halborn.
              </p>
              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-ink/15 pt-8 font-mono text-xs uppercase tracking-[0.2em]">
                <div><div className="text-ink/50">Insurance</div><div className="font-display mt-2 text-2xl normal-case tracking-tight">$500M</div></div>
                <div><div className="text-ink/50">Audit</div><div className="font-display mt-2 text-2xl normal-case tracking-tight">SOC 2 II</div></div>
                <div><div className="text-ink/50">Uptime</div><div className="font-display mt-2 text-2xl normal-case tracking-tight">99.99%</div></div>
              </div>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">Rewards</span>
              <h4 className="font-display mt-6 text-3xl leading-tight">
                Earn up to <span className="text-gold">8.4%</span> APY on staked assets.
              </h4>
              <p className="mt-4 text-sm text-white/60">
                Native staking with transparent validators, daily compounding and no lock-up beyond the protocol minimum.
              </p>
              <a href="#contact" className="mt-8 inline-flex items-center gap-2 text-sm text-gold story-link">
                Explore staking <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
              className="order-2 overflow-hidden rounded-[28px] bg-bone lg:order-1"
            >
              <img src={portfolioArt} alt="Editorial portfolio art" loading="lazy" width={1280} height={960} className="h-full w-full object-cover" />
            </motion.div>
            <div className="order-1 lg:order-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">05 - The Portfolio</span>
              <h3 className="font-display mt-6 text-5xl font-light leading-[1.05] tracking-tight sm:text-6xl">
                A quiet, weekly read on your wealth.
              </h3>
              <p className="mt-6 max-w-md text-white/60">
                Performance, attribution and tax lots, written like a letter from your
                portfolio manager - not a bloated dashboard.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- MARKETS ---------------- */
function Markets() {
  const coins = [
    { sym: "BTC", name: "Bitcoin", price: "67,420.10", chg: "+1.84", path: "M0,30 L20,28 L40,32 L60,22 L80,26 L100,18 L120,14 L140,10" },
    { sym: "ETH", name: "Ethereum", price: "3,842.55", chg: "+2.41", path: "M0,28 L20,30 L40,24 L60,20 L80,22 L100,12 L120,16 L140,8" },
    { sym: "SOL", name: "Solana", price: "184.30", chg: "+5.10", path: "M0,32 L20,26 L40,28 L60,18 L80,14 L100,20 L120,10 L140,6" },
    { sym: "AVAX", name: "Avalanche", price: "42.18", chg: "+3.22", path: "M0,30 L20,32 L40,24 L60,28 L80,18 L100,22 L120,14 L140,12" },
    { sym: "LINK", name: "Chainlink", price: "18.92", chg: "+1.12", path: "M0,28 L20,24 L40,30 L60,22 L80,26 L100,18 L120,20 L140,14" },
    { sym: "DOT", name: "Polkadot", price: "8.42", chg: "-0.42", path: "M0,18 L20,22 L40,16 L60,24 L80,20 L100,28 L120,24 L140,30" },
  ];
  return (
    <section id="markets" className="relative bg-bone py-32 text-ink">
      <div className="mx-auto max-w-[1400px] px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink/50">06 - Markets</span>
              <h2 className="font-display mt-6 text-5xl font-light leading-[1.02] tracking-tight sm:text-7xl">
                Live tape, written in gold.
              </h2>
            </div>
            <a href="#contact" className="story-link text-sm">View all markets →</a>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {coins.map((c, i) => (
            <Reveal key={c.sym} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="group rounded-3xl border border-ink/10 bg-white p-7 transition hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-ink font-display text-gold">
                      {c.sym[0]}
                    </div>
                    <div>
                      <div className="font-display text-xl">{c.name}</div>
                      <div className="font-mono text-xs text-ink/40">{c.sym} · USD</div>
                    </div>
                  </div>
                  <span className={`font-mono text-xs ${c.chg.startsWith("-") ? "text-red-500" : "text-emerald-600"}`}>
                    {c.chg}%
                  </span>
                </div>

                <div className="mt-6 flex items-end justify-between">
                  <div className="font-display text-3xl tracking-tight">${c.price}</div>
                  <svg viewBox="0 0 140 40" className="h-12 w-32 text-ink/80">
                    <motion.path
                      d={c.path}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.6, ease: "easeInOut" }}
                    />
                  </svg>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- SECURITY ---------------- */
function Security() {
  return (
    <section id="security" className="relative overflow-hidden bg-ink py-32">
      <div className="mx-auto grid max-w-[1400px] items-center gap-16 px-6 lg:grid-cols-2">
        <Reveal>
          <motion.div
            whileHover={{ scale: 1.02, rotate: -1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-6"
          >
            <img src={securityArt} alt="Security vault" loading="lazy" width={1024} height={1280} className="mx-auto w-[440px] max-w-full" />
          </motion.div>
        </Reveal>

        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">07 - Security</span>
          <h2 className="font-display mt-6 text-5xl font-light leading-[1.02] tracking-tight sm:text-7xl">
            Quiet, patient, paranoid.
          </h2>
          <p className="mt-6 max-w-md text-white/60">
            We treat your keys the way private banks treat gold - multi-party computation,
            geographically distributed vaults, and never a single point of failure.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              { icon: Lock, label: "MPC key sharding across 5 jurisdictions" },
              { icon: ShieldCheck, label: "SOC 2 Type II · ISO 27001 certified" },
              { icon: Sparkles, label: "Quarterly third-party audits" },
              { icon: Globe2, label: "$500M insurance through Lloyd's" },
            ].map((i, idx) => (
              <Reveal key={idx} delay={idx * 0.05}>
                <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/80">
                  <i.icon className="mt-0.5 size-4 text-gold" />
                  {i.label}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- JOURNAL ---------------- */
function Journal() {
  const featured = {
    cat: "Market Letter",
    title: "The quiet accumulation: why this cycle looks different.",
    read: "8 min read",
  };
  const stories = [
    { cat: "Education", title: "A patient investor's guide to ETH staking.", read: "6 min" },
    { cat: "Macro", title: "Stablecoins as the new money market fund.", read: "5 min" },
    { cat: "Research", title: "On-chain volume signals nobody is watching.", read: "9 min" },
    { cat: "Brief", title: "What changed in Bitcoin's halving year.", read: "4 min" },
  ];
  return (
    <section id="journal" className="relative bg-bone py-32 text-ink">
      <div className="mx-auto max-w-[1400px] px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink/50">08 - Journal</span>
              <h2 className="font-display mt-6 text-5xl font-light leading-[1.02] tracking-tight sm:text-7xl">
                Field notes from the desk.
              </h2>
            </div>
            <a href="#contact" className="story-link text-sm">All issues →</a>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <motion.article
              whileHover={{ y: -6 }}
              className="group relative h-full overflow-hidden rounded-[28px] bg-ink p-10 text-white"
            >
              <img src={chartArt} alt="" loading="lazy" width={1280} height={960} className="absolute inset-0 h-full w-full object-cover opacity-40 transition duration-700 group-hover:scale-105" />
              <div className="relative flex h-full min-h-[420px] flex-col justify-end">
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">{featured.cat}</span>
                <h3 className="font-display mt-4 text-3xl font-light leading-tight sm:text-5xl">{featured.title}</h3>
                <div className="mt-6 flex items-center gap-4 text-xs text-white/60">
                  <span>{featured.read}</span>
                  <span>·</span>
                  <span>Issue 014</span>
                </div>
              </div>
            </motion.article>
          </Reveal>

          <div className="grid gap-4">
            {stories.map((s, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <motion.article
                  whileHover={{ x: 6 }}
                  className="group flex items-start justify-between gap-6 rounded-2xl border border-ink/10 bg-white p-6 transition hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.15)]"
                >
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/40">{s.cat}</span>
                    <h4 className="font-display mt-2 text-xl leading-tight">{s.title}</h4>
                    <div className="mt-3 text-xs text-ink/50">{s.read}</div>
                  </div>
                  <ArrowUpRight className="size-5 shrink-0 text-ink/40 transition group-hover:rotate-45 group-hover:text-gold" />
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
function Testimonials() {
  const items = [
    { quote: "The first crypto product that feels designed for adults. Nova Ledger became my default for the long-term book.", author: "Marin Kovač", role: "Family Office, Zürich" },
    { quote: "Editorial in a category that desperately needs editing. The vault and desk are best-in-class.", author: "Sasha Lindqvist", role: "Allocator, Stockholm" },
    { quote: "It's a quiet competence - exactly what I want when seven figures are on the line.", author: "Daniel Okafor", role: "Founder, Lagos" },
  ];
  return (
    <section className="relative bg-ink py-32">
      <div className="mx-auto max-w-[1400px] px-6">
        <Reveal>
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">09 - Readers</span>
          <h2 className="font-display mt-6 max-w-3xl text-5xl font-light leading-[1.02] tracking-tight sm:text-7xl">
            Trusted by investors who notice the details.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {items.map((t, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <motion.figure
                whileHover={{ y: -6 }}
                className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-8"
              >
                <blockquote className="font-display text-2xl font-light leading-snug text-white/90">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-10 flex items-center gap-3 border-t border-white/10 pt-5">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gold to-white/30" />
                  <div>
                    <div className="text-sm text-white">{t.author}</div>
                    <div className="text-xs text-white/50">{t.role}</div>
                  </div>
                </figcaption>
              </motion.figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function Faq() {
  const items = [
    { q: "How do I open an Nova Ledger account?", a: "Verify your identity in under three minutes from your phone, fund via wire or card, and start allocating." },
    { q: "Where are my assets held?", a: "In MPC-secured vaults distributed across five jurisdictions, insured to $500M through Lloyd's syndicates." },
    { q: "What does Nova Ledger cost?", a: "A flat 0.15% custody fee, transparent execution spreads, and no hidden withdrawal markups." },
    { q: "Which assets are supported?", a: "Over 240 digital assets across Bitcoin, Ethereum, Solana, Avalanche and major L2s." },
    { q: "Is staking native or pooled?", a: "Native staking with transparent validator sets you can audit on-chain." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative bg-bone py-32 text-ink">
      <div className="mx-auto grid max-w-[1400px] items-start gap-16 px-6 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink/50">10 - Questions</span>
          <h2 className="font-display mt-6 text-5xl font-light leading-[1.02] tracking-tight sm:text-6xl">
            The fine print, in plain language.
          </h2>
          <p className="mt-6 max-w-sm text-ink/60">
            If something isn't here, our concierge desk replies in under two hours, every day of the year.
          </p>
        </Reveal>

        <div className="divide-y divide-ink/10 border-y border-ink/10">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <button
                key={i}
                onClick={() => setOpen(isOpen ? null : i)}
                className="block w-full py-6 text-left"
              >
                <div className="flex items-center justify-between gap-6">
                  <span className="font-display text-2xl tracking-tight sm:text-3xl">{it.q}</span>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/15">
                    {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                  </span>
                </div>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="mt-4 max-w-2xl text-ink/60">{it.a}</p>
                </motion.div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CONTACT SECTION ---------------- */
function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Valid email is required.";
    if (!phone || !/^[+\d\s\-().]{6,20}$/.test(phone)) errs.phone = "Valid phone number is required.";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setSubmitting(true);

    try {
      const res = await fetch("/api/crm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }),
      });
      const data = (await res.json()) as { success?: boolean; error?: string };

      if (res.ok && data.success) {
        setSuccess(true);
        toast.success("Enquiry received!");
      } else {
        toast.error(data.error ?? "Failed to send. Please try again.");
      }
    } catch {
      toast.error("Network error. Please check your connection.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="relative bg-ink py-32">
      <div className="mx-auto max-w-[1400px] px-6">
        <Reveal>
          <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">11 - Contact</span>
              <h2 className="font-display mt-6 text-5xl font-light leading-[1.02] tracking-tight sm:text-6xl">
                Speak with our concierge desk.
              </h2>
              <p className="mt-6 max-w-sm text-white/60">
                Our team responds in under two hours, every day of the year.
                Share your details and we'll be in touch.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { icon: Globe2, label: "Available in 142 countries" },
                  { icon: ShieldCheck, label: "Your data is handled securely" },
                  { icon: Sparkles, label: "Dedicated account management" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 text-sm text-white/60">
                    <item.icon className="size-4 text-gold" />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>

            {success ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center rounded-[28px] border border-gold/20 bg-gold/5 p-12 text-center"
              >
                <CheckCircle2 className="size-12 text-gold" />
                <h3 className="font-display mt-6 text-2xl">Enquiry received.</h3>
                <p className="mt-3 text-white/60">
                  Thank you! Your enquiry has been received successfully.
                  We'll be in touch within two hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <ContactField
                      id="contact-name"
                      type="text"
                      placeholder="Full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                  </div>
                  <div>
                    <ContactField
                      id="contact-email"
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <ContactField
                    id="contact-phone"
                    type="tel"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
                </div>
                <textarea
                  id="contact-message"
                  placeholder="Message (optional)"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-gold/60 focus:bg-white/[0.06] resize-none"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-medium text-ink transition hover:scale-[1.01] disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="size-4" />
                      Send enquiry
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ContactField(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-gold/60 focus:bg-white/[0.06]"
    />
  );
}

/* ---------------- CTA ---------------- */
function CTA({ onSignUp }: { onSignUp: () => void }) {
  return (
    <section id="cta" className="relative bg-bone py-32 text-ink">
      <div className="mx-auto max-w-[1400px] px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[36px] bg-gold p-12 text-ink sm:p-20">
            <div className="absolute -right-20 -top-20 h-[420px] w-[420px] rounded-full bg-white/30 blur-3xl" />
            <div className="relative grid items-end gap-12 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.25em]">12 - Begin</span>
                <h2 className="font-display mt-6 text-5xl font-light leading-[1.02] tracking-tight sm:text-8xl">
                  Compose your <span className="italic">first position</span> in three minutes.
                </h2>
              </div>
              <div className="flex flex-col gap-3">
                <button onClick={onSignUp} className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-medium text-gold transition hover:scale-[1.02]">
                  Open an account <ArrowUpRight className="size-4" />
                </button>
                <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/30 px-7 py-4 text-sm text-ink transition hover:bg-ink/5">
                  Talk to concierge
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer className="relative bg-ink pb-12 pt-24 text-white">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="font-display text-[clamp(4rem,18vw,18rem)] font-light leading-[0.85] tracking-tighter text-white/5">
          Nova Ledger
        </div>
        <div className="mt-12 grid gap-12 border-t border-white/10 pt-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <span className="inline-block h-6 w-6 rounded-full bg-gold" />
              <span className="font-display text-xl">Nova Ledger</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-white/50">
              An editorial home for serious crypto investors. Composed in New York, Lisbon and Singapore.
            </p>
          </div>

          <FooterCol title="Platform" links={[
            { label: "Wallet", href: "#" },
            { label: "Desk", href: "#" },
            { label: "Vault", href: "#" },
            { label: "Staking", href: "#" },
            { label: "Markets", href: "/#markets" },
          ]} />
          <FooterCol title="Company" links={[
            { label: "About", href: "#" },
            { label: "Journal", href: "/#journal" },
            { label: "Careers", href: "#" },
            { label: "Press", href: "#" },
            { label: "Contact", href: "#contact" },
          ]} />
          <FooterCol title="Legal" links={[
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms & Conditions", href: "/terms" },
          ]} />
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
          <span>© 2026 Nova Ledger Holdings</span>
          <span>SOC 2 Type II · ISO 27001 · Insured to $500M</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">{title}</div>
      <ul className="mt-4 space-y-2 text-sm text-white/70">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} className="story-link transition hover:text-white">{l.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
