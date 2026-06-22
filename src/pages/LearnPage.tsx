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
  { id: "intro", label: "Intro à la Crypto", icon: Bitcoin },
  { id: "blockchain", label: "Blockchain", icon: Layers },
  { id: "investing", label: "Investissement", icon: TrendingUp },
  { id: "trading", label: "Bases du Trading", icon: BarChart3 },
  { id: "ai", label: "IA & Marchés", icon: Brain },
  { id: "portfolio", label: "Portefeuille", icon: PieChart },
  { id: "risk", label: "Gestion des Risques", icon: AlertTriangle },
  { id: "trends", label: "Tendances du Marché", icon: Activity },
  { id: "security", label: "Sécurité", icon: Shield },
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
              nova-ledger://learn - contenu éducatif
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
          Accès Membre · Contenu Éducatif
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, delay: 0.15 }}
          className="font-display mt-8 max-w-4xl text-[clamp(2.5rem,6vw,6rem)] font-light leading-[0.95] tracking-tight"
        >
          Votre guide dans
          <span className="block italic text-gold">l'univers des actifs numériques.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-6 max-w-xl text-base text-white/60 sm:text-lg"
        >
          Une éducation éditoriale pour les investisseurs sérieux. Naviguez dans les onglets ci-dessus
          pour tout explorer, des fondamentaux de la blockchain à la gestion avancée des risques.
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
        label="Introduction à la Cryptomonnaie"
        title={<>Qu'est-ce que <span className="italic text-gold">la cryptomonnaie ?</span></>}
        sub="La cryptomonnaie est une forme numérique d'argent sécurisée par la cryptographie, fonctionnant sur des réseaux décentralisés sans le contrôle d'une banque centrale."
      />

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Reveal delay={0.1}>
          <EduCard
            icon={Bitcoin}
            accent
            title="Argent Numérique"
            body="Les cryptomonnaies comme le Bitcoin permettent le transfert de valeur de pair à pair dans le monde entier, 24h/24 et 7j/7, sans banques ni intermédiaires."
          />
        </Reveal>
        <Reveal delay={0.15}>
          <EduCard
            icon={Lock}
            title="Sécurité Cryptographique"
            body="Chaque transaction est sécurisée par une cryptographie avancée - des clés publiques et privées qui rendent la falsification mathématiquement impossible."
          />
        </Reveal>
        <Reveal delay={0.2}>
          <EduCard
            icon={Globe}
            title="Décentralisation"
            body="Aucune entité unique ne contrôle le réseau. Des milliers de nœuds dans le monde valident les transactions et maintiennent le consensus."
          />
        </Reveal>
      </div>

      <Reveal className="mt-16">
        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-gold/10 via-transparent to-transparent p-8 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="font-display text-3xl font-light">Un bref historique</h3>
              <div className="mt-8 space-y-6">
                {[
                  { year: "2008", event: "Satoshi Nakamoto publie le livre blanc du Bitcoin." },
                  { year: "2009", event: "Le premier bloc de Bitcoin (Bloc Genesis) est miné." },
                  { year: "2015", event: "Lancement d'Ethereum, introduisant les contrats intelligents." },
                  { year: "2020", event: "L'été de la DeFi - 10 milliards de dollars bloqués dans des protocoles décentralisés." },
                  { year: "2024", event: "Les ETF Bitcoin au comptant sont approuvés, l'adoption grand public s'accélère." },
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
              <h3 className="font-display text-3xl font-light">Concepts clés</h3>
              <div className="mt-8 space-y-4">
                {[
                  { term: "Portefeuille (Wallet)", def: "Logiciel qui stocke vos clés privées et vous permet de gérer vos actifs numériques." },
                  { term: "Clé Privée", def: "Un numéro secret qui prouve la propriété de votre cryptomonnaie - ne la partagez jamais." },
                  { term: "Transaction", def: "Un transfert de valeur signé numériquement et enregistré en permanence sur la blockchain." },
                  { term: "Minage", def: "Le processus de validation des transactions et de leur ajout à la blockchain en échange de récompenses." },
                  { term: "Halving", def: "Un événement programmé qui réduit de moitié la nouvelle offre de Bitcoin - historiquement un catalyseur haussier." },
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
        label="Comprendre la Blockchain"
        title={<>Le registre qui<span className="italic text-gold block"> ne peut pas mentir.</span></>}
        sub="Une blockchain est un registre immuable et distribué. Chaque bloc contient une empreinte cryptographique du bloc précédent, formant une chaîne incassable."
      />

      <div className="mt-16 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <div className="space-y-4">
            {["En-tête de Bloc", "Données de Transaction", "Racine Merkle", "Hash du Bloc Précédent", "Nonce"].map((part, i) => (
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
                  <div className="text-xs text-white/40">Composant de bloc #{i + 1}</div>
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
              title="Mécanismes de Consensus"
              body="Comment des milliers d'inconnus s'accordent sur la vérité : la Preuve de Travail (Proof of Work) nécessite un effort de calcul ; la Preuve d'Enjeu (Proof of Stake) nécessite une garantie. Les deux empêchent la fraude."
            />
            <EduCard
              icon={Zap}
              title="Contrats Intelligents"
              body="Code auto-exécutable sur la blockchain. Lorsque les conditions sont remplies, le contrat s'exécute automatiquement - sans avocats, sans intermédiaires."
            />
            <EduCard
              icon={Globe}
              title="Mise à l'échelle de Couche 2"
              body="Des protocoles comme le Lightning Network et Optimism traitent des milliers de transactions hors chaîne, se réglant sur la chaîne principale pour la sécurité."
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
        label="Investissement en Actifs Numériques"
        title={<>Investissez avec<span className="italic text-gold"> conviction.</span></>}
        sub="L'investissement en actifs numériques récompense la patience, la recherche et un dimensionnement de position discipliné. Le marché est volatil - votre stratégie ne doit pas l'être."
      />

      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        {[
          { icon: TrendingUp, accent: true, title: "HODLing", body: "Conservation à long terme à travers la volatilité. Historiquement, la meilleure stratégie pour Bitcoin et Ethereum sur des cycles de plus de 4 ans." },
          { icon: BarChart3, title: "Investissement Programmé (DCA)", body: "Investissez un montant fixe selon un calendrier régulier, quel que soit le prix - élimine le stress d'essayer de synchroniser le marché." },
          { icon: PieChart, title: "Allocation de Portefeuille", body: "La plupart des investisseurs sérieux maintiennent la crypto entre 5 et 20 % de leur valeur nette totale, avec BTC et ETH formant le cœur." },
          { icon: Activity, title: "Cycles de Marché", body: "La crypto suit des cycles de 4 ans corrélés aux halvings de Bitcoin. Comprendre les cycles évite les ventes de panique." },
          { icon: Shield, title: "Diligence Raisonnable", body: "Recherchez la tokenomique, l'équipe, le cas d'utilisation et les métriques on-chain avant d'allouer. La plupart des altcoins échouent." },
          { icon: Globe, title: "Sensibilisation Réglementaire", body: "Restez au courant des changements réglementaires dans votre juridiction. Les exigences de déclaration fiscale varient considérablement." },
        ].map((c, i) => (
          <Reveal key={c.title} delay={i * 0.05}>
            <EduCard {...c} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12">
        <div className="rounded-[28px] border border-gold/20 bg-gold/5 p-8">
          <h3 className="font-display text-2xl">Le Cadre d'Allocation Nova Ledger</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Cœur (BTC + ETH)", pct: 60, color: "bg-gold" },
              { label: "Grandes Capitalisations", pct: 25, color: "bg-white/70" },
              { label: "Haut Risque / Spéculatif", pct: 15, color: "bg-white/30" },
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
        label="Bases du Trading Crypto"
        title={<>Lisez le marché,<span className="italic text-gold"> pas le bruit.</span></>}
        sub="Le trading réussi nécessite de la discipline, des règles d'entrée et de sortie claires, et une volonté de rester sur la touche la plupart du temps."
      />

      <div className="mt-16 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <div className="space-y-6">
            <h3 className="font-display text-2xl font-light">Graphique en Chandeliers en Direct</h3>
            <CandlestickChart />
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Volume 24h", val: "812M $", up: true },
                { label: "Intérêt Ouvert", val: "4,2MM $", up: true },
                { label: "Taux de Financement", val: "0,012%", up: false },
                { label: "Spread Bid/Ask", val: "0,08%", up: false },
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
            <h3 className="font-display text-2xl font-light">Concepts Fondamentaux</h3>
            {[
              { term: "Support & Résistance", def: "Niveaux de prix où la pression d'achat ou de vente se concentre historiquement." },
              { term: "Analyse du Volume", def: "Un volume élevé confirme les mouvements de prix. Les rallyes à faible volume sont suspects." },
              { term: "Force Relative", def: "Comparez la performance de l'actif au BTC. Les actifs qui devancent le BTC signalent une rotation sectorielle." },
              { term: "Stop Loss", def: "Un ordre de sortie prédéfini qui limite vos pertes. Non négociable pour chaque transaction." },
              { term: "Taille de Position", def: "Ne risquez jamais plus de 1 à 2 % de votre portefeuille sur une seule transaction." },
              { term: "Ratio Risque/Récompense", def: "Ne prenez que des transactions où la récompense potentielle est d'au moins 3x le risque." },
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
        label="IA & Analyse de Marché"
        title={<>Intelligence artificielle,<span className="italic text-gold"> jugement humain.</span></>}
        sub="Les outils d'IA augmentent l'analyse - reconnaissance des modèles, analyse du sentiment, détection des anomalies - mais ne peuvent pas remplacer une prise de décision humaine disciplinée."
      />

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { icon: Brain, accent: true, title: "Analyse du Sentiment", body: "Les modèles NLP analysent des millions de publications sociales et d'articles d'actualité pour évaluer le sentiment du marché en temps réel - peur, cupidité, incertitude." },
          { icon: Activity, title: "Analytique On-Chain", body: "L'IA identifie les mouvements des baleines, les flux des échanges et le comportement des mineurs à partir des données brutes de la blockchain - des signaux invisibles pour les lecteurs de graphiques." },
          { icon: BarChart3, title: "Reconnaissance de Modèles", body: "Les modèles d'apprentissage automatique formés sur des décennies de données de prix identifient des modèles graphiques avec des avantages statistiques - pas des garanties." },
          { icon: Zap, title: "Exécution Algorithmique", body: "Les algorithmes de routage d'ordres intelligents exécutent de grandes positions avec un impact minimal sur le marché, en utilisant les stratégies TWAP et VWAP." },
          { icon: Globe, title: "Corrélations Macro", body: "Les modèles d'IA suivent l'évolution de la corrélation de la crypto avec les actifs à risque, les taux et la force du dollar pour contextualiser l'action des prix." },
          { icon: Shield, title: "Modélisation des Risques", body: "L'IA au niveau du portefeuille soumet vos actifs à des tests de résistance par rapport à des scénarios de baisse historiques et génère des estimations de risques extrêmes." },
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
    { name: "Autres", sym: "ALTS", pct: 16, color: "rgba(255,255,255,0.2)" },
  ];

  return (
    <SectionWrap>
      <SectionHeader
        num="06"
        label="Diversification du Portefeuille"
        title={<>Construire un portefeuille<span className="italic text-gold"> qui dure.</span></>}
        sub="La diversification dans la crypto ne consiste pas à posséder 100 pièces - il s'agit d'une allocation intelligente entre les classes d'actifs, les profils de risque et les périodes de détention."
      />

      <div className="mt-16 grid gap-8 lg:grid-cols-2">
        <Reveal>
          <div className="rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-8">
            <h3 className="font-display text-2xl font-light">Allocation Type</h3>
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
              { icon: PieChart, accent: true, title: "Conscience des Corrélations", body: "Les altcoins sont fortement corrélés au BTC. 'Se diversifier' dans 20 altcoins offre souvent moins de protection que de simplement détenir plus de BTC." },
              { icon: TrendingUp, title: "Rééquilibrage", body: "Rééquilibrez systématiquement chaque trimestre. Réduisez les gagnants qui ont dépassé leur allocation cible ; ajoutez aux retardataires." },
              { icon: Shield, title: "Ratio de Stockage à Froid", body: "Conservez plus de 80 % de vos actifs à long terme dans des portefeuilles matériels. Ne gardez que le capital de trading actif sur les échanges." },
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
        label="Gestion des Risques"
        title={<>Survivre d'abord,<span className="italic text-gold"> prospérer ensuite.</span></>}
        sub="Les investisseurs qui font croître leur patrimoine dans la crypto sont ceux qui ont évité des pertes catastrophiques - pas ceux qui ont choisi le meilleur altcoin."
      />

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { icon: AlertTriangle, accent: true, title: "Taille de Position", body: "Le Critère de Kelly : dimensionnez les positions de manière à ce qu'une série de pertes ne puisse pas menacer votre capital. Ne pariez jamais la maison." },
          { icon: Shield, title: "Stop Loss", body: "Définissez votre perte maximale avant d'entrer dans une transaction. Respectez-la. Les arrêts émotionnels sont la première cause de ruine de compte." },
          { icon: Activity, title: "Limites de Baisse", body: "Fixez une limite de perte quotidienne et mensuelle. Si elle est franchie, arrêtez de trader. Le trading de revanche détruit plus de comptes que n'importe quel marché." },
          { icon: Lock, title: "Risque lié aux Échanges", body: "Ne gardez que ce que vous tradez activement sur les échanges. La leçon de FTX : pas vos clés, pas vos pièces." },
          { icon: Globe, title: "Risque Réglementaire", body: "Les gouvernements peuvent restreindre ou interdire la crypto. Diversifiez-vous dans plusieurs juridictions et conservez des dossiers de conformité." },
          { icon: Zap, title: "Risque des Contrats Intelligents", body: "Les protocoles DeFi peuvent être exploités. Vérifiez l'historique des audits, la concentration de la TVL et la couverture d'assurance avant de déposer." },
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
        label="Tendances du Marché"
        title={<>Les forces macro<span className="italic text-gold"> façonnant la crypto.</span></>}
        sub="Comprendre les forces plus larges qui animent les marchés de la cryptomonnaie est essentiel pour se positionner avant les mouvements majeurs."
      />

      <div className="mt-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { sym: "BTC", name: "Bitcoin", price: "67 420", chg: "+1.84%", up: true, path: "M0,30 L20,28 L40,32 L60,22 L80,26 L100,18 L120,14 L140,10" },
            { sym: "ETH", name: "Ethereum", price: "3 842", chg: "+2.41%", up: true, path: "M0,28 L20,30 L40,24 L60,20 L80,22 L100,12 L120,16 L140,8" },
            { sym: "SOL", name: "Solana", price: "184,3", chg: "+5.10%", up: true, path: "M0,32 L20,26 L40,28 L60,18 L80,14 L100,20 L120,10 L140,6" },
            { sym: "DOT", name: "Polkadot", price: "8,42", chg: "-0.42%", up: false, path: "M0,18 L20,22 L40,16 L60,24 L80,20 L100,28 L120,24 L140,30" },
          ].map((c, i) => (
            <Reveal key={c.sym} delay={i * 0.05}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.08] font-display text-gold">{c.sym[0]}</div>
                  <span className={`font-mono text-xs ${c.up ? "text-emerald-400" : "text-red-400"}`}>{c.chg}</span>
                </div>
                <div className="mt-3 font-display text-sm text-white/60">{c.name}</div>
                <div className="font-display text-2xl tracking-tight">{c.price} $</div>
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
            { icon: TrendingUp, accent: true, title: "Afflux des ETF Bitcoin", body: "L'approbation des ETF au comptant a ouvert la crypto aux capitaux institutionnels. Les afflux mensuels rivalisent désormais avec les ETF sur l'or - un changement structurel de la demande." },
            { icon: Globe, title: "Expansion des Stablecoins", body: "La circulation de l'USDT et de l'USDC dépasse les 150 milliards de dollars. Les stablecoins deviennent une infrastructure mondiale de paiement essentielle, attirant l'attention des régulateurs." },
            { icon: Zap, title: "Adoption de la Couche 2", body: "Les L2 d'Ethereum traitent plus de transactions que la chaîne principale à une fraction du coût. Cette évolutivité attire les développeurs et les utilisateurs." },
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
        label="Bonnes Pratiques de Sécurité"
        title={<>Vos clés,<span className="italic text-gold"> votre royaume.</span></>}
        sub="La sécurité des cryptomonnaies relève de la responsabilité personnelle. Il n'y a pas de rétrofacturation, pas de service client. Faites-le bien du premier coup."
      />

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { icon: Lock, accent: true, title: "Portefeuilles Matériels", body: "Ledger, Trezor, Coldcard - pour toute détention valant la peine d'être protégée, un portefeuille matériel est non négociable. Les clés privées ne touchent jamais Internet." },
          { icon: Shield, title: "Sécurité de la Phrase de Récupération", body: "Votre phrase de 12/24 mots est la clé maîtresse. Stockez-la sur du métal, dans plusieurs emplacements physiques, jamais numériquement." },
          { icon: Zap, title: "Multi-Signature", body: "Exigez plusieurs clés pour autoriser les transactions. Un multisig 2 sur 3 ou 3 sur 5 élimine les points de défaillance uniques." },
          { icon: AlertTriangle, title: "Défense contre le Phishing", body: "Vérifiez les URL de manière obsessionnelle. Mettez les sites officiels en favoris. Ne cliquez jamais sur les liens crypto dans les e-mails, les DM ou les publicités." },
          { icon: Activity, title: "Sécurité des Échanges", body: "Activez la 2FA avec une clé matérielle ou une application d'authentification (pas de SMS). Mettez en liste blanche les adresses de retrait. Utilisez des mots de passe uniques et forts." },
          { icon: Globe, title: "Hygiène de Confidentialité", body: "Utilisez des portefeuilles séparés pour différentes activités. Ne publiez pas vos avoirs. Les données de la blockchain sont définitivement publiques." },
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
    { q: "La cryptomonnaie est-elle légale ?", a: "Dans la plupart des juridictions, oui - il est légal de détenir et d'échanger de la cryptomonnaie. Les réglementations varient considérablement d'un pays à l'autre, en particulier concernant les échanges, les taxes et les stablecoins. Consultez toujours la réglementation locale." },
    { q: "Comment les gains cryptographiques sont-ils imposés ?", a: "La plupart des juridictions considèrent la crypto comme un bien à des fins fiscales. Les ventes et les échanges déclenchent des plus-values. Les récompenses de minage et de staking sont généralement des revenus. Enregistrez toutes vos transactions." },
    { q: "Quelle est la manière la plus sûre de stocker la crypto ?", a: "Un portefeuille matériel (stockage à froid) est la référence absolue. Pour les gros montants, envisagez des systèmes multi-signatures avec des clés réparties sur plusieurs sites." },
    { q: "Combien devrais-je investir dans la crypto ?", a: "Une fourchette largement citée est de 1 à 10 % des actifs investissables pour les investisseurs prudents, et jusqu'à 20 % pour ceux ayant une forte tolérance au risque et un horizon à long terme. N'investissez jamais plus que ce que vous pouvez vous permettre de perdre." },
    { q: "Quelle est la différence entre Bitcoin et Ethereum ?", a: "Bitcoin est de l'or numérique - une réserve de valeur avec une offre fixe de 21 millions. Ethereum est de la monnaie programmable - une plateforme informatique décentralisée qui alimente la DeFi, les NFT et les contrats intelligents." },
    { q: "La DeFi est-elle sûre ?", a: "La DeFi comporte des risques importants : piratage de contrats intelligents, manipulation d'oracles, retraits de liquidité (rug pulls) et incertitude réglementaire. Utilisez uniquement des protocoles audités, diversifiez votre exposition et ne déposez jamais plus que ce que vous pouvez perdre." },
    { q: "Qu'est-ce qu'un ETF crypto ?", a: "Un fonds négocié en bourse qui détient des actifs cryptographiques ou des contrats à terme, négocié sur les bourses traditionnelles. Les ETF Bitcoin au comptant ont été lancés aux États-Unis en 2024, permettant une exposition sans auto-conservation." },
    { q: "Comment évaluer un altcoin ?", a: "Évaluez : l'utilité et l'économie du jeton, les références de l'équipe, l'adoption on-chain, le paysage concurrentiel, la liquidité et le risque réglementaire. La plupart des altcoins échouent - appliquez une extrême prudence." },
  ];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <SectionWrap>
      <SectionHeader
        num="10"
        label="Foire Aux Questions"
        title={<>Les questions<span className="italic text-gold"> de chaque investisseur.</span></>}
        sub="Des réponses ancrées dans la réalité, pas dans le marketing. Si votre question ne figure pas ici, contactez notre service de conciergerie ci-dessous."
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
        toast.success("Demande reçue !");
      } else {
        toast.error(data.error ?? "Échec de l'envoi. Veuillez réessayer.");
      }
    } catch {
      toast.error("Erreur réseau. Veuillez vérifier votre connexion.");
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
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">Service de Conciergerie</span>
              <h2 className="font-display mt-6 text-4xl font-light leading-tight sm:text-5xl">
                Des questions sur votre parcours d'investissement ?
              </h2>
              <p className="mt-6 text-white/60">
                Notre équipe dédiée vous répond dans les deux heures, tous les jours de l'année.
                Partagez votre demande et nous vous fournirons des conseils sur mesure.
              </p>
            </div>

            {success ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center rounded-[28px] border border-gold/20 bg-gold/5 p-12 text-center"
              >
                <CheckCircle2 className="size-12 text-gold" />
                <h3 className="font-display mt-6 text-2xl">Demande reçue.</h3>
                <p className="mt-3 text-white/60">
                  Merci ! Votre demande a été reçue avec succès.
                  Nous vous contacterons dans les deux heures.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <input
                      type="text"
                      placeholder="Nom complet"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-gold/60 focus:bg-white/[0.06]"
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Adresse e-mail"
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
                    placeholder="Numéro de téléphone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-gold/60 focus:bg-white/[0.06]"
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
                </div>
                <textarea
                  placeholder="Message (facultatif)"
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
                      Envoi...
                    </>
                  ) : (
                    <>
                      <Send className="size-4" />
                      Envoyer la demande
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
            <a href="/" className="story-link hover:text-white">Accueil</a>
            <a href="/privacy" className="story-link hover:text-white">Confidentialité</a>
            <a href="/terms" className="story-link hover:text-white">Conditions</a>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/30">
            © 2026 Nova Ledger Holdings
          </span>
        </div>
      </div>
    </footer>
  );
}
