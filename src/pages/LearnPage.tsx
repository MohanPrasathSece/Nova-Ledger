import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  Bitcoin,
  TrendingUp,
  Shield,
  BarChart3,
  Brain,
  PieChart,
  AlertTriangle,
  Activity,
  Lock,
  HelpCircle,
  ArrowUpRight,
  Send,
  CheckCircle2,
  ChevronDown,
  Zap,
  Globe,
  Layers,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Nav } from "@/components/site/Nav";
import { Reveal } from "@/components/site/Reveal";
import { AuthModal, type AuthMode } from "@/components/site/AuthModal";

/* ======================================================
   LEARN PAGE - Premium Educational Crypto Experience
   ====================================================== */

const TABS = [
  { id: "intro", label: "Intro to Crypto", icon: Bitcoin },
  { id: "blockchain", label: "Blockchain", icon: Layers },
  { id: "investing", label: "Investing", icon: TrendingUp },
  { id: "trading", label: "Trading Basics", icon: BarChart3 },
  { id: "ai", label: "AI & Markets", icon: Brain },
  { id: "portfolio", label: "Portfolio", icon: PieChart },
  { id: "risk", label: "Risk Management", icon: AlertTriangle },
  { id: "trends", label: "Market Trends", icon: Activity },
  { id: "security", label: "Security", icon: Shield },
  { id: "faq", label: "FAQ", icon: HelpCircle },
];

export default function LearnPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("intro");
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const tabBarRef = useRef<HTMLDivElement>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  function scrollTabIntoView(id: string) {
    if (!tabBarRef.current) return;
    const btn = tabBarRef.current.querySelector(`[data-tab="${id}"]`);
    btn?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }

  function handleTabChange(id: string) {
    setActiveTab(id);
    scrollTabIntoView(id);
  }

  return (
    <div className="relative min-h-screen bg-ink text-white">
      <Nav onSignIn={() => { setAuthMode("signin"); setAuthOpen(true); }} onSignUp={() => { setAuthMode("signup"); setAuthOpen(true); }} />

      {/* Hero */}
      <LearnHero />

      {/* Mac-style Browser Tabs */}
      <div className="sticky top-16 z-40 border-b border-white/10 bg-ink/90 backdrop-blur-xl">
        <div className="mx-auto max-w-[1400px] px-4">
          {/* Mac window chrome */}
          <div className="flex items-center gap-2 border-b border-white/[0.06] py-2">
            <span className="h-3 w-3 rounded-full bg-red-500/70" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
            <span className="h-3 w-3 rounded-full bg-green-500/70" />
            <span className="ml-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
              nova-ledger://learn - educational content
            </span>
          </div>
          {/* Tab bar */}
          <div
            ref={tabBarRef}
            className="flex gap-1 overflow-x-auto py-1 scrollbar-none"
            style={{ scrollbarWidth: "none" }}
          >
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  data-tab={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-t-lg border-b-2 px-4 py-2.5 text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? "border-gold bg-white/[0.06] text-gold"
                      : "border-transparent text-white/50 hover:bg-white/[0.03] hover:text-white/80"
                  }`}
                >
                  <Icon className="size-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="min-h-screen"
        >
          {activeTab === "intro" && <IntroCrypto />}
          {activeTab === "blockchain" && <BlockchainSection />}
          {activeTab === "investing" && <InvestingSection />}
          {activeTab === "trading" && <TradingSection />}
          {activeTab === "ai" && <AISection />}
          {activeTab === "portfolio" && <PortfolioSection />}
          {activeTab === "risk" && <RiskSection />}
          {activeTab === "trends" && <TrendsSection />}
          {activeTab === "security" && <SecuritySection />}
          {activeTab === "faq" && <FaqSection />}
        </motion.div>
      </AnimatePresence>

      {/* Contact Form for logged-in users */}
      <LoggedInContactForm />

      {/* Footer */}
      <LearnFooter />

      <AuthModal open={authOpen} mode={authMode} onClose={() => setAuthOpen(false)} onSwitch={setAuthMode} />
    </div>
  );
}

/* ---- LEARN HERO ---- */
function LearnHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section ref={ref} className="relative overflow-hidden pt-32 pb-16">
      {/* Floating orbs */}
      <motion.div style={{ y }} className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(closest-side,rgba(233,216,74,0.12),transparent)] blur-3xl" />
        <div className="absolute -right-20 top-20 h-[400px] w-[400px] rounded-full bg-[radial-gradient(closest-side,rgba(233,216,74,0.07),transparent)] blur-3xl" />
      </motion.div>

      {/* Floating crypto symbols */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {["₿", "Ξ", "◎", "◈", "⬡"].map((sym, i) => (
          <motion.span
            key={i}
            initial={{ y: 0, opacity: 0.06 }}
            animate={{ y: [-10, 10, -10], opacity: [0.06, 0.12, 0.06] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.7, ease: "easeInOut" }}
            className="absolute font-display text-gold"
            style={{
              fontSize: `${60 + i * 20}px`,
              left: `${10 + i * 18}%`,
              top: `${20 + (i % 3) * 20}%`,
              filter: "blur(1px)",
            }}
          >
            {sym}
          </motion.span>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-white/70"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
          Member Access · Educational Content
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, delay: 0.15 }}
          className="font-display mt-8 max-w-4xl text-[clamp(2.5rem,6vw,6rem)] font-light leading-[0.95] tracking-tight"
        >
          Your guide to the
          <span className="block italic text-gold">digital asset universe.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-6 max-w-xl text-base text-white/60 sm:text-lg"
        >
          Curated, editorial education for serious investors. Navigate the tabs above
          to explore everything from blockchain fundamentals to advanced risk management.
        </motion.p>

        {/* Live market widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-10 inline-flex items-center gap-6 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 backdrop-blur-sm"
        >
          <LiveTicker sym="BTC" price="67,420" chg="+1.84%" />
          <div className="h-8 w-px bg-white/10" />
          <LiveTicker sym="ETH" price="3,842" chg="+2.41%" />
          <div className="h-8 w-px bg-white/10" />
          <LiveTicker sym="SOL" price="184.3" chg="+5.10%" />
        </motion.div>
      </div>
    </section>
  );
}

function LiveTicker({ sym, price, chg }: { sym: string; price: string; chg: string }) {
  const isUp = chg.startsWith("+");
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.06] font-display text-xs text-gold">
        {sym[0]}
      </div>
      <div>
        <div className="font-mono text-xs text-white/40">{sym}/USD</div>
        <div className="flex items-center gap-2">
          <span className="font-display text-sm">${price}</span>
          <span className={`font-mono text-[10px] ${isUp ? "text-emerald-400" : "text-red-400"}`}>{chg}</span>
        </div>
      </div>
    </div>
  );
}

/* ---- CANDLESTICK CHART COMPONENT ---- */
function CandlestickChart() {
  const candles = [
    { o: 60, c: 55, h: 65, l: 50 },
    { o: 55, c: 62, h: 68, l: 52 },
    { o: 62, c: 58, h: 70, l: 55 },
    { o: 58, c: 70, h: 75, l: 56 },
    { o: 70, c: 65, h: 78, l: 63 },
    { o: 65, c: 72, h: 80, l: 62 },
    { o: 72, c: 68, h: 82, l: 65 },
    { o: 68, c: 78, h: 85, l: 66 },
    { o: 78, c: 74, h: 88, l: 70 },
    { o: 74, c: 82, h: 90, l: 72 },
    { o: 82, c: 76, h: 88, l: 73 },
    { o: 76, c: 85, h: 92, l: 74 },
  ];

  const height = 120;
  const candleW = 12;
  const gap = 8;
  const svgWidth = candles.length * (candleW + gap);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">BTC/USD · 1H</span>
        <span className="font-mono text-xs text-gold">$67,420 ↑</span>
      </div>
      <svg viewBox={`0 0 ${svgWidth} ${height + 20}`} className="w-full">
        {candles.map((c, i) => {
          const isUp = c.c > c.o;
          const x = i * (candleW + gap) + candleW / 2;
          const scale = height / 92;
          const bodyTop = height - Math.max(c.o, c.c) * scale;
          const bodyH = Math.abs(c.c - c.o) * scale;
          const wickTop = height - c.h * scale;
          const wickBot = height - c.l * scale;
          const color = isUp ? "rgba(52,211,153,0.9)" : "rgba(248,113,113,0.9)";

          return (
            <motion.g
              key={i}
              initial={{ opacity: 0, scaleY: 0 }}
              whileInView={{ opacity: 1, scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              style={{ transformOrigin: `${x}px ${height}px` }}
            >
              {/* Wick */}
              <line x1={x} y1={wickTop} x2={x} y2={wickBot} stroke={color} strokeWidth="1" opacity="0.6" />
              {/* Body */}
              <rect
                x={x - candleW / 2}
                y={bodyTop}
                width={candleW}
                height={Math.max(bodyH, 2)}
                fill={color}
                rx="2"
              />
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}

/* ---- EDUCATIONAL CARD ---- */
function EduCard({ icon: Icon, title, body, accent = false }: { icon: React.ComponentType<{ className?: string }>; title: string; body: string; accent?: boolean }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={`group relative h-full overflow-hidden rounded-3xl border p-7 transition ${
        accent
          ? "border-gold/20 bg-gradient-to-b from-gold/10 to-transparent"
          : "border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent hover:border-gold/20"
      }`}
    >
      <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top_left,rgba(233,216,74,0.06),transparent_60%)]" />
      <div className={`relative flex h-12 w-12 items-center justify-center rounded-2xl ${accent ? "bg-gold text-ink" : "bg-white/[0.08] text-gold"}`}>
        <Icon className="size-5" />
      </div>
      <h3 className="font-display relative mt-6 text-2xl tracking-tight">{title}</h3>
      <p className="relative mt-3 text-sm leading-relaxed text-white/60">{body}</p>
    </motion.div>
  );
}

/* ---- SECTION WRAPPER ---- */
function SectionWrap({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`mx-auto max-w-[1400px] px-6 py-20 ${className}`}>
      {children}
    </section>
  );
}

function SectionHeader({ num, label, title, sub }: { num: string; label: string; title: React.ReactNode; sub?: string }) {
  return (
    <Reveal>
      <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">{num} - {label}</span>
      <h2 className="font-display mt-6 text-5xl font-light leading-[1.02] tracking-tight sm:text-6xl">{title}</h2>
      {sub && <p className="mt-6 max-w-2xl text-white/60">{sub}</p>}
    </Reveal>
  );
}

/* ================ SECTION: INTRO TO CRYPTO ================ */
function IntroCrypto() {
  return (
    <SectionWrap>
      <SectionHeader
        num="01"
        label="Introduction to Cryptocurrency"
        title={<>What is <span className="italic text-gold">cryptocurrency?</span></>}
        sub="Cryptocurrency is a digital form of money secured by cryptography, operating on decentralised networks without central bank control."
      />

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Reveal delay={0.1}>
          <EduCard
            icon={Bitcoin}
            accent
            title="Digital Money"
            body="Cryptocurrencies like Bitcoin allow peer-to-peer value transfer globally, 24/7, without banks or intermediaries."
          />
        </Reveal>
        <Reveal delay={0.15}>
          <EduCard
            icon={Lock}
            title="Cryptographic Security"
            body="Every transaction is secured by advanced cryptography - public and private keys that make forgery mathematically impossible."
          />
        </Reveal>
        <Reveal delay={0.2}>
          <EduCard
            icon={Globe}
            title="Decentralisation"
            body="No single entity controls the network. Thousands of nodes worldwide validate transactions and maintain consensus."
          />
        </Reveal>
      </div>

      <Reveal className="mt-16">
        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-gold/10 via-transparent to-transparent p-8 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="font-display text-3xl font-light">A brief history</h3>
              <div className="mt-8 space-y-6">
                {[
                  { year: "2008", event: "Satoshi Nakamoto publishes the Bitcoin whitepaper." },
                  { year: "2009", event: "The first Bitcoin block (Genesis Block) is mined." },
                  { year: "2015", event: "Ethereum launches, introducing smart contracts." },
                  { year: "2020", event: "DeFi summer - $10B locked in decentralised protocols." },
                  { year: "2024", event: "Bitcoin spot ETFs approved, mainstream adoption accelerates." },
                ].map((item) => (
                  <div key={item.year} className="flex items-start gap-4">
                    <span className="mt-1 font-mono text-xs text-gold">{item.year}</span>
                    <div className="mt-1 mr-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold/60 mt-2" />
                    <p className="text-sm text-white/70">{item.event}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-display text-3xl font-light">Key concepts</h3>
              <div className="mt-8 space-y-4">
                {[
                  { term: "Wallet", def: "Software that stores your private keys and lets you manage your digital assets." },
                  { term: "Private Key", def: "A secret number that proves ownership of your cryptocurrency - never share it." },
                  { term: "Transaction", def: "A digitally signed transfer of value recorded permanently on the blockchain." },
                  { term: "Mining", def: "The process of validating transactions and adding them to the blockchain in exchange for rewards." },
                  { term: "Halving", def: "A scheduled event that cuts Bitcoin's new supply in half - historically a bullish catalyst." },
                ].map((item) => (
                  <div key={item.term} className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
                    <div className="font-display text-gold">{item.term}</div>
                    <p className="mt-1 text-sm text-white/60">{item.def}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </SectionWrap>
  );
}

/* ================ SECTION: BLOCKCHAIN ================ */
function BlockchainSection() {
  return (
    <SectionWrap>
      <SectionHeader
        num="02"
        label="Understanding Blockchain"
        title={<>The ledger that<span className="italic text-gold block"> cannot lie.</span></>}
        sub="A blockchain is an immutable, distributed ledger. Each block contains a cryptographic fingerprint of the previous block, forming an unbreakable chain."
      />

      <div className="mt-16 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <div className="space-y-4">
            {["Block Header", "Transaction Data", "Merkle Root", "Previous Block Hash", "Nonce"].map((part, i) => (
              <motion.div
                key={part}
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 font-mono text-xs text-gold">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <div className="font-display text-lg">{part}</div>
                  <div className="text-xs text-white/40">Block component #{i + 1}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="space-y-6">
            <EduCard
              icon={Layers}
              accent
              title="Consensus Mechanisms"
              body="How thousands of strangers agree on truth: Proof of Work requires computational effort; Proof of Stake requires collateral. Both prevent fraud."
            />
            <EduCard
              icon={Zap}
              title="Smart Contracts"
              body="Self-executing code on the blockchain. When conditions are met, the contract runs automatically - no lawyers, no middlemen."
            />
            <EduCard
              icon={Globe}
              title="Layer 2 Scaling"
              body="Protocols like Lightning Network and Optimism process thousands of transactions off-chain, settling on the main chain for security."
            />
          </div>
        </Reveal>
      </div>
    </SectionWrap>
  );
}

/* ================ SECTION: INVESTING ================ */
function InvestingSection() {
  return (
    <SectionWrap>
      <SectionHeader
        num="03"
        label="Digital Asset Investing"
        title={<>Invest with<span className="italic text-gold"> conviction.</span></>}
        sub="Digital asset investing rewards patience, research, and disciplined position sizing. The market is volatile - your framework must not be."
      />

      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        {[
          { icon: TrendingUp, accent: true, title: "HODLing", body: "Long-term holding through volatility. Historically the best strategy for Bitcoin and Ethereum over 4+ year cycles." },
          { icon: BarChart3, title: "Dollar-Cost Averaging", body: "Invest a fixed amount on a regular schedule regardless of price - eliminates the stress of timing the market." },
          { icon: PieChart, title: "Portfolio Allocation", body: "Most serious investors keep crypto between 5–20% of total net worth, with BTC and ETH forming the core." },
          { icon: Activity, title: "Market Cycles", body: "Crypto follows 4-year cycles correlated with Bitcoin halvings. Understanding cycles prevents panic selling." },
          { icon: Shield, title: "Due Diligence", body: "Research tokenomics, team, use case, and on-chain metrics before allocating. Most altcoins fail." },
          { icon: Globe, title: "Regulatory Awareness", body: "Stay current on regulatory changes in your jurisdiction. Tax reporting requirements vary significantly." },
        ].map((c, i) => (
          <Reveal key={c.title} delay={i * 0.05}>
            <EduCard {...c} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12">
        <div className="rounded-[28px] border border-gold/20 bg-gold/5 p-8">
          <h3 className="font-display text-2xl">The Nova Ledger Allocation Framework</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Core (BTC + ETH)", pct: 60, color: "bg-gold" },
              { label: "Large Cap Alts", pct: 25, color: "bg-white/70" },
              { label: "High-Risk / Speculative", pct: 15, color: "bg-white/30" },
            ].map((row) => (
              <div key={row.label}>
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">{row.label}</span>
                  <span className="font-mono text-white/50">{row.pct}%</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${row.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className={`h-full rounded-full ${row.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </SectionWrap>
  );
}

/* ================ SECTION: TRADING ================ */
function TradingSection() {
  return (
    <SectionWrap>
      <SectionHeader
        num="04"
        label="Crypto Trading Basics"
        title={<>Read the tape,<span className="italic text-gold"> not the noise.</span></>}
        sub="Successful trading requires discipline, clear entry and exit rules, and a willingness to sit on your hands most of the time."
      />

      <div className="mt-16 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <div className="space-y-6">
            <h3 className="font-display text-2xl font-light">Live Candlestick Chart</h3>
            <CandlestickChart />
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "24h Volume", val: "$812M", up: true },
                { label: "Open Interest", val: "$4.2B", up: true },
                { label: "Funding Rate", val: "0.012%", up: false },
                { label: "Bid/Ask Spread", val: "0.08%", up: false },
              ].map((m) => (
                <div key={m.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">{m.label}</div>
                  <div className={`mt-1 font-display text-xl ${m.up ? "text-emerald-400" : "text-white"}`}>{m.val}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-light">Core Concepts</h3>
            {[
              { term: "Support & Resistance", def: "Price levels where buying or selling pressure historically concentrates." },
              { term: "Volume Analysis", def: "High volume confirms price moves. Low-volume rallies are suspicious." },
              { term: "Relative Strength", def: "Compare asset performance to BTC. Assets leading BTC signal sector rotation." },
              { term: "Stop Loss", def: "A pre-set exit order that limits your downside. Non-negotiable for every trade." },
              { term: "Position Sizing", def: "Never risk more than 1–2% of your portfolio on a single trade." },
              { term: "Risk/Reward Ratio", def: "Only take trades where the potential reward is at least 3x the risk." },
            ].map((item) => (
              <div key={item.term} className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
                <div className="font-display text-gold">{item.term}</div>
                <p className="mt-1 text-sm text-white/60">{item.def}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </SectionWrap>
  );
}

/* ================ SECTION: AI & MARKETS ================ */
function AISection() {
  return (
    <SectionWrap>
      <SectionHeader
        num="05"
        label="AI & Market Analysis"
        title={<>Machine intelligence,<span className="italic text-gold"> human judgment.</span></>}
        sub="AI tools augment analysis - pattern recognition, sentiment parsing, anomaly detection - but cannot replace disciplined human decision-making."
      />

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { icon: Brain, accent: true, title: "Sentiment Analysis", body: "NLP models parse millions of social posts and news articles to gauge market sentiment in real time - fear, greed, uncertainty." },
          { icon: Activity, title: "On-Chain Analytics", body: "AI identifies whale movements, exchange flows, and miner behaviour from raw blockchain data - signals invisible to chart readers." },
          { icon: BarChart3, title: "Pattern Recognition", body: "Machine learning models trained on decades of price data identify chart patterns with statistical edges - not guarantees." },
          { icon: Zap, title: "Algorithmic Execution", body: "Smart order routing algorithms execute large positions with minimal market impact, using TWAP and VWAP strategies." },
          { icon: Globe, title: "Macro Correlations", body: "AI models track crypto's evolving correlation with risk assets, rates, and dollar strength to contextualise price action." },
          { icon: Shield, title: "Risk Modelling", body: "Portfolio-level AI stress tests your holdings against historical drawdown scenarios and generates tail-risk estimates." },
        ].map((c, i) => (
          <Reveal key={c.title} delay={i * 0.05}>
            <EduCard {...c} />
          </Reveal>
        ))}
      </div>
    </SectionWrap>
  );
}

/* ================ SECTION: PORTFOLIO ================ */
function PortfolioSection() {
  const assets = [
    { name: "Bitcoin", sym: "BTC", pct: 42, color: "var(--gold)" },
    { name: "Ethereum", sym: "ETH", pct: 28, color: "rgba(255,255,255,0.9)" },
    { name: "Solana", sym: "SOL", pct: 14, color: "rgba(255,255,255,0.5)" },
    { name: "Other", sym: "ALTS", pct: 16, color: "rgba(255,255,255,0.2)" },
  ];

  return (
    <SectionWrap>
      <SectionHeader
        num="06"
        label="Portfolio Diversification"
        title={<>Build a portfolio<span className="italic text-gold"> that endures.</span></>}
        sub="Diversification in crypto is not about owning 100 coins - it's about intelligent allocation across asset classes, risk profiles, and holding periods."
      />

      <div className="mt-16 grid gap-8 lg:grid-cols-2">
        <Reveal>
          <div className="rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-8">
            <h3 className="font-display text-2xl font-light">Sample Allocation</h3>
            <div className="mt-8 space-y-4">
              {assets.map((a, i) => (
                <div key={a.sym}>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full" style={{ background: a.color }} />
                      <span className="text-white/80">{a.name}</span>
                      <span className="font-mono text-white/30">{a.sym}</span>
                    </div>
                    <span className="font-mono text-white/60">{a.pct}%</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${a.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full"
                      style={{ background: a.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="space-y-4">
            {[
              { icon: PieChart, accent: true, title: "Correlation Awareness", body: "Altcoins are highly correlated to BTC. 'Diversifying' into 20 altcoins often provides less protection than simply holding more BTC." },
              { icon: TrendingUp, title: "Rebalancing", body: "Systematically rebalance quarterly. Trim winners that have grown beyond their target allocation; add to laggards." },
              { icon: Shield, title: "Cold Storage Ratio", body: "Keep 80%+ of long-term holdings in hardware wallets. Only keep active trading capital on exchanges." },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 0.1}>
                <EduCard {...c} />
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </SectionWrap>
  );
}

/* ================ SECTION: RISK ================ */
function RiskSection() {
  return (
    <SectionWrap>
      <SectionHeader
        num="07"
        label="Risk Management"
        title={<>Survive first,<span className="italic text-gold"> then thrive.</span></>}
        sub="The investors who compound wealth in crypto are those who avoided catastrophic loss - not those who picked the best altcoin."
      />

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { icon: AlertTriangle, accent: true, title: "Position Sizing", body: "The Kelly Criterion: size positions so a string of losses cannot threaten your capital base. Never bet the house." },
          { icon: Shield, title: "Stop Losses", body: "Define your maximum loss before entering any trade. Honour it. Emotional stops are the #1 cause of account ruin." },
          { icon: Activity, title: "Drawdown Limits", body: "Set a daily and monthly loss limit. If breached, stop trading. Revenge trading destroys more accounts than any market." },
          { icon: Lock, title: "Exchange Risk", body: "Keep only what you're actively trading on exchanges. The lesson of FTX: not your keys, not your coins." },
          { icon: Globe, title: "Regulatory Risk", body: "Governments can restrict or ban crypto. Diversify across jurisdictions and maintain compliance records." },
          { icon: Zap, title: "Smart Contract Risk", body: "DeFi protocols can be exploited. Audit history, TVL concentration, and insurance coverage before depositing." },
        ].map((c, i) => (
          <Reveal key={c.title} delay={i * 0.05}>
            <EduCard {...c} />
          </Reveal>
        ))}
      </div>
    </SectionWrap>
  );
}

/* ================ SECTION: TRENDS ================ */
function TrendsSection() {
  return (
    <SectionWrap>
      <SectionHeader
        num="08"
        label="Market Trends"
        title={<>The macro forces<span className="italic text-gold"> shaping crypto.</span></>}
        sub="Understanding the broader forces driving crypto markets is essential for positioning ahead of major moves."
      />

      <div className="mt-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { sym: "BTC", name: "Bitcoin", price: "67,420", chg: "+1.84%", up: true, path: "M0,30 L20,28 L40,32 L60,22 L80,26 L100,18 L120,14 L140,10" },
            { sym: "ETH", name: "Ethereum", price: "3,842", chg: "+2.41%", up: true, path: "M0,28 L20,30 L40,24 L60,20 L80,22 L100,12 L120,16 L140,8" },
            { sym: "SOL", name: "Solana", price: "184.3", chg: "+5.10%", up: true, path: "M0,32 L20,26 L40,28 L60,18 L80,14 L100,20 L120,10 L140,6" },
            { sym: "DOT", name: "Polkadot", price: "8.42", chg: "-0.42%", up: false, path: "M0,18 L20,22 L40,16 L60,24 L80,20 L100,28 L120,24 L140,30" },
          ].map((c, i) => (
            <Reveal key={c.sym} delay={i * 0.05}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.08] font-display text-gold">{c.sym[0]}</div>
                  <span className={`font-mono text-xs ${c.up ? "text-emerald-400" : "text-red-400"}`}>{c.chg}</span>
                </div>
                <div className="mt-3 font-display text-sm text-white/60">{c.name}</div>
                <div className="font-display text-2xl tracking-tight">${c.price}</div>
                <svg viewBox="0 0 140 40" className="mt-3 h-10 w-full">
                  <motion.path
                    d={c.path}
                    fill="none"
                    stroke={c.up ? "rgba(52,211,153,0.7)" : "rgba(248,113,113,0.7)"}
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.6, ease: "easeInOut" }}
                  />
                </svg>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: TrendingUp, accent: true, title: "Bitcoin ETF Inflows", body: "Spot ETF approval opened crypto to institutional capital. Monthly inflows now rival gold ETFs - a structural shift in demand." },
            { icon: Globe, title: "Stablecoin Expansion", body: "USDT and USDC circulation exceeds $150B. Stablecoins are becoming critical global payment infrastructure, driving regulatory focus." },
            { icon: Zap, title: "Layer 2 Adoption", body: "Ethereum L2s process more transactions than the mainchain at a fraction of the cost. This scalability is attracting developers and users." },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1}>
              <EduCard {...c} />
            </Reveal>
          ))}
        </div>
      </div>
    </SectionWrap>
  );
}

/* ================ SECTION: SECURITY ================ */
function SecuritySection() {
  return (
    <SectionWrap>
      <SectionHeader
        num="09"
        label="Security Best Practices"
        title={<>Your keys,<span className="italic text-gold"> your kingdom.</span></>}
        sub="Cryptocurrency security is personal responsibility. There are no chargebacks, no customer service lines. Get it right the first time."
      />

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { icon: Lock, accent: true, title: "Hardware Wallets", body: "Ledger, Trezor, Coldcard - for any holding worth protecting, a hardware wallet is non-negotiable. Private keys never touch the internet." },
          { icon: Shield, title: "Seed Phrase Security", body: "Your 12/24-word seed phrase is the master key. Store it on metal, in multiple physical locations, never digitally." },
          { icon: Zap, title: "Multi-Signature", body: "Require multiple keys to authorise transactions. 2-of-3 or 3-of-5 multisig eliminates single points of failure." },
          { icon: AlertTriangle, title: "Phishing Defence", body: "Verify URLs obsessively. Bookmark official sites. Never click crypto links in emails, DMs, or ads - even from 'known' senders." },
          { icon: Activity, title: "Exchange Security", body: "Enable 2FA with a hardware key or authenticator app (not SMS). Whitelist withdrawal addresses. Use unique, strong passwords." },
          { icon: Globe, title: "Privacy Hygiene", body: "Use separate wallets for different activities. Don't post holdings publicly. Blockchain data is permanently public." },
        ].map((c, i) => (
          <Reveal key={c.title} delay={i * 0.05}>
            <EduCard {...c} />
          </Reveal>
        ))}
      </div>
    </SectionWrap>
  );
}

/* ================ SECTION: FAQ ================ */
function FaqSection() {
  const faqs = [
    { q: "Is cryptocurrency legal?", a: "In most jurisdictions, yes - cryptocurrency is legal to hold and trade. Regulations vary significantly by country, particularly around exchanges, taxes, and stablecoins. Always consult local regulation." },
    { q: "How are crypto gains taxed?", a: "Most jurisdictions treat crypto as property for tax purposes. Sales and swaps trigger capital gains events. Mining and staking rewards are typically income. Record all transactions." },
    { q: "What is the safest way to store crypto?", a: "A hardware wallet (cold storage) is the gold standard. For large amounts, consider multi-signature schemes with keys distributed across locations." },
    { q: "How much should I invest in crypto?", a: "A widely cited range is 1–10% of investable assets for conservative investors, up to 20% for those with high risk tolerance and long time horizons. Never invest more than you can afford to lose entirely." },
    { q: "What's the difference between Bitcoin and Ethereum?", a: "Bitcoin is digital gold - a store of value with a fixed 21M supply. Ethereum is programmable money - a decentralised computing platform that powers DeFi, NFTs, and smart contracts." },
    { q: "Is DeFi safe?", a: "DeFi carries significant risks: smart contract exploits, oracle manipulation, rug pulls, and regulatory uncertainty. Only use audited protocols, diversify exposure, and never deposit more than you can afford to lose." },
    { q: "What is a crypto ETF?", a: "An exchange-traded fund that holds crypto assets or futures, traded on traditional stock exchanges. Bitcoin spot ETFs launched in the US in 2024, enabling exposure without self-custody." },
    { q: "How do I evaluate an altcoin?", a: "Assess: token utility and economics, team credentials and track record, on-chain adoption metrics, competitive landscape, liquidity, and regulatory risk. Most altcoins fail - apply extreme scrutiny." },
  ];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <SectionWrap>
      <SectionHeader
        num="10"
        label="Frequently Asked Questions"
        title={<>The questions<span className="italic text-gold"> every investor asks.</span></>}
        sub="Answers grounded in reality, not marketing. If your question isn't here, contact our concierge desk below."
      />

      <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
        {faqs.map((item, i) => {
          const isOpen = open === i;
          return (
            <button
              key={i}
              onClick={() => setOpen(isOpen ? null : i)}
              className="block w-full py-6 text-left"
            >
              <div className="flex items-center justify-between gap-6">
                <span className="font-display text-xl tracking-tight sm:text-2xl">{item.q}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15"
                >
                  <ChevronDown className="size-4" />
                </motion.span>
              </div>
              <motion.div
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <p className="mt-4 max-w-3xl text-white/60">{item.a}</p>
              </motion.div>
            </button>
          );
        })}
      </div>
    </SectionWrap>
  );
}

/* ================ LOGGED-IN CONTACT FORM ================ */
function LoggedInContactForm() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.email?.split("@")[0] ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const errs: Record<string, string> = {};
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
    <section className="relative bg-white/[0.02] py-24">
      <div className="mx-auto max-w-[1400px] px-6">
        <Reveal>
          <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">Concierge Desk</span>
              <h2 className="font-display mt-6 text-4xl font-light leading-tight sm:text-5xl">
                Have questions about your investment journey?
              </h2>
              <p className="mt-6 text-white/60">
                Our dedicated team responds within two hours, every day of the year.
                Share your enquiry and we'll provide tailored guidance.
              </p>
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
                    <input
                      type="text"
                      placeholder="Full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-gold/60 focus:bg-white/[0.06]"
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-gold/60 focus:bg-white/[0.06]"
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-gold/60 focus:bg-white/[0.06]"
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
                </div>
                <textarea
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

/* ================ FOOTER ================ */
function LearnFooter() {
  return (
    <footer className="border-t border-white/10 bg-ink py-12">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="inline-block h-5 w-5 rounded-full bg-gold" />
            <span className="font-display text-lg">Nova Ledger</span>
          </div>
          <div className="flex flex-wrap items-center gap-6 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
            <a href="/" className="story-link hover:text-white">Home</a>
            <a href="/privacy" className="story-link hover:text-white">Privacy Policy</a>
            <a href="/terms" className="story-link hover:text-white">Terms & Conditions</a>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/30">
            © 2026 Nova Ledger Holdings
          </span>
        </div>
      </div>
    </footer>
  );
}
