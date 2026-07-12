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
import { LogoIcon } from "@/components/site/LogoIcon";
import { AuthModal, type AuthMode, COUNTRY_PHONE_PATTERNS } from "@/components/site/AuthModal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
            Numéro Nº 014 · Hiver 2026
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-display mt-8 text-[clamp(2.75rem,8vw,8rem)] font-light leading-[0.95] tracking-tight text-balance"
          >
            Un nouveau standard
            <span className="block italic text-gold">pour l'investissement crypto.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-8 max-w-xl text-balance text-base text-white/60 sm:text-lg"
          >
            Nova Ledger est la maison éditoriale des investisseurs sérieux en actifs numériques -
            un portefeuille, un bureau et un coffre, composés avec la précision d'une banque privée.
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
              Ouvrir un compte
              <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <a
              href="#platform"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm text-white/80 transition hover:bg-white/5"
            >
              Découvrir la plateforme
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
    "Vol. Quotidien · $812M",
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
    { value: 4.2, prefix: "$", suffix: "B", decimals: 1, label: "Actifs sous gestion" },
    { value: 320000, suffix: "+", label: "Investisseurs actifs" },
    { value: 142, label: "Pays desservis" },
    { value: 812, prefix: "$", suffix: "M", label: "Volume quotidien moyen" },
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
              02 - La Plateforme
            </span>
            <h2 className="font-display mt-6 text-5xl font-light leading-[1.02] tracking-tight sm:text-7xl">
              Tout ce dont un investisseur a besoin.
              <span className="block italic text-ink/40">Rien de plus.</span>
            </h2>
            <p className="mt-6 max-w-md text-ink/60">
              Huit instruments de précision, composés en un espace de travail éditorial unique.
              Passez du portefeuille au bureau et au coffre sans perdre le fil.
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
  { icon: Wallet, title: "Portefeuille en auto-garde", body: "Portefeuille multi-chaîne avec isolation des clés de niveau matériel et récupération en un clic." },
  { icon: LineChart, title: "Bureau de portefeuille", body: "Allocation, performance, attribution et lots fiscaux - tout dans une vue éditoriale unifiée." },
  { icon: Coins, title: "Trading au comptant", body: "Liquidité profonde, routage intelligent et exécution institutionnelle depuis une seule fenêtre." },
  { icon: Sparkles, title: "Rendement & staking", body: "Staking natif sur ETH, SOL, ATOM et DOT avec des ensembles de validateurs transparents." },
  { icon: ShieldCheck, title: "Coffre-fort", body: "Pool d'assurance de 500 M$ et infrastructure SOC 2 Type II pour les détentions à long terme." },
  { icon: Globe2, title: "Accès mondial", body: "Disponible dans 142 pays avec des rails fiduciaires locaux et des rapports fiscaux adaptés." },
];

/* ---------------- SHOWCASE ---------------- */
function Showcase() {
  return (
    <section className="relative bg-ink py-32">
      <div className="mx-auto max-w-[1400px] space-y-32 px-6">
        <Reveal>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">03 - Le Bureau</span>
              <h3 className="font-display mt-6 text-5xl font-light leading-[1.05] tracking-tight sm:text-6xl">
                Un bureau de trading conçu pour vous.
              </h3>
              <p className="mt-6 max-w-md text-white/60">
                Spot, perpétuels et options sur quarante plateformes. Le routage intelligent trouve la
                meilleure exécution ; votre écran reste d'une clarté absolue.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-white/70">
                {["Liquidité agrégée de plus de 40 plateformes", "Latence de routage inférieure à 50ms", "Grille tarifaire transparente"].map((t) => (
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
              <span className="font-mono text-[11px] uppercase tracking-[0.25em]">04 - Le Coffre</span>
              <h3 className="font-display mt-6 text-5xl font-light leading-[1.05] tracking-tight sm:text-7xl">
                Tenez sur le long arc du cycle.
              </h3>
              <p className="mt-6 max-w-xl text-ink/70">
                Un coffre en stockage froid pour les convictions à long terme, assuré à 500 M$ et
                audité trimestriellement par Trail of Bits et Halborn.
              </p>
              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-ink/15 pt-8 font-mono text-xs uppercase tracking-[0.2em]">
                <div><div className="text-ink/50">Assurance</div><div className="font-display mt-2 text-2xl normal-case tracking-tight">$500M</div></div>
                <div><div className="text-ink/50">Audit</div><div className="font-display mt-2 text-2xl normal-case tracking-tight">SOC 2 II</div></div>
                <div><div className="text-ink/50">Disponibilité</div><div className="font-display mt-2 text-2xl normal-case tracking-tight">99.99%</div></div>
              </div>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">Récompenses</span>
              <h4 className="font-display mt-6 text-3xl leading-tight">
                Gagnez jusqu'à <span className="text-gold">8.4%</span> APY sur les actifs mis en staking.
              </h4>
              <p className="mt-4 text-sm text-white/60">
                Staking natif avec des validateurs transparents, composition quotidienne et aucun blocage au-delà du minimum protocolaire.
              </p>
              <a href="#contact" className="mt-8 inline-flex items-center gap-2 text-sm text-gold story-link">
                Explorer le staking <ArrowUpRight className="size-4" />
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
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">05 - Le Portefeuille</span>
              <h3 className="font-display mt-6 text-5xl font-light leading-[1.05] tracking-tight sm:text-6xl">
                Une lecture hebdomadaire sur votre patrimoine.
              </h3>
              <p className="mt-6 max-w-md text-white/60">
                Performance, attribution et lots fiscaux, rédigés comme une lettre de votre
                gestionnaire de portefeuille - pas un tableau de bord surchargé.
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
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink/50">06 - Marchés</span>
              <h2 className="font-display mt-6 text-5xl font-light leading-[1.02] tracking-tight sm:text-7xl">
                Le fil en direct, écrit en or.
              </h2>
            </div>
            <a href="#contact" className="story-link text-sm">Voir tous les marchés →</a>
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
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">07 - Sécurité</span>
          <h2 className="font-display mt-6 text-5xl font-light leading-[1.02] tracking-tight sm:text-7xl">
            Discret, patient, paranoïaque.
          </h2>
          <p className="mt-6 max-w-md text-white/60">
            Nous traitons vos clés comme les banques privées traitent l'or - calcul multipartite,
            coffres répartis géographiquement, et jamais un point de défaillance unique.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              { icon: Lock, label: "Fragmentation MPC des clés sur 5 juridictions" },
              { icon: ShieldCheck, label: "SOC 2 Type II · Certifié ISO 27001" },
              { icon: Sparkles, label: "Audits trimestriels par des tiers" },
              { icon: Globe2, label: "Assurance de 500 M$ via Lloyd's" },
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
    cat: "Lettre de Marché",
    title: "L'accumulation silencieuse : pourquoi ce cycle est différent.",
    read: "8 min de lecture",
  };
  const stories = [
    { cat: "Éducation", title: "Le guide de l'investisseur patient pour le staking ETH.", read: "6 min" },
    { cat: "Macro", title: "Les stablecoins, le nouveau fonds monétaire.", read: "5 min" },
    { cat: "Recherche", title: "Les signaux on-chain que personne ne surveille.", read: "9 min" },
    { cat: "Bref", title: "Ce qui a changé lors de l'année du halving de Bitcoin.", read: "4 min" },
  ];
  return (
    <section id="journal" className="relative bg-bone py-32 text-ink">
      <div className="mx-auto max-w-[1400px] px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink/50">08 - Journal</span>
              <h2 className="font-display mt-6 text-5xl font-light leading-[1.02] tracking-tight sm:text-7xl">
                Notes de terrain depuis le bureau.
              </h2>
            </div>
            <a href="#contact" className="story-link text-sm">Tous les numéros →</a>
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
    { quote: "Le premier produit crypto conçu pour les adultes. Nova Ledger est devenu ma référence pour le portefeuille long terme.", author: "Marin Kovač", role: "Family Office, Zürich" },
    { quote: "Éditorial dans une catégorie qui en a désespérément besoin. Le coffre et le bureau sont au sommet de leur catégorie.", author: "Sasha Lindqvist", role: "Allocateur, Stockholm" },
    { quote: "C'est une compétence silencieuse - exactement ce que je veux quand sept chiffres sont en jeu.", author: "Daniel Okafor", role: "Fondateur, Lagos" },
  ];
  return (
    <section className="relative bg-ink py-32">
      <div className="mx-auto max-w-[1400px] px-6">
        <Reveal>
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">09 - Lecteurs</span>
          <h2 className="font-display mt-6 max-w-3xl text-5xl font-light leading-[1.02] tracking-tight sm:text-7xl">
            La confiance des investisseurs qui remarquent les détails.
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
    { q: "Comment ouvrir un compte Nova Ledger ?", a: "Vérifiez votre identité en moins de trois minutes depuis votre téléphone, alimentez par virement ou carte, et commencez à allouer." },
    { q: "Où sont détenus mes actifs ?", a: "Dans des coffres sécurisés par MPC répartis sur cinq juridictions, assurés à 500 M$ via les syndicats Lloyd's." },
    { q: "Combien coûte Nova Ledger ?", a: "Des frais de garde fixes de 0,15 %, des spreads d'exécution transparents, et aucune majoration cachée sur les retraits." },
    { q: "Quels actifs sont pris en charge ?", a: "Plus de 240 actifs numériques couvrant Bitcoin, Ethereum, Solana, Avalanche et les principaux L2." },
    { q: "Le staking est-il natif ou mutualisé ?", a: "Staking natif avec des ensembles de validateurs transparents que vous pouvez auditer on-chain." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative bg-bone py-32 text-ink">
      <div className="mx-auto grid max-w-[1400px] items-start gap-16 px-6 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink/50">10 - Questions</span>
          <h2 className="font-display mt-6 text-5xl font-light leading-[1.02] tracking-tight sm:text-6xl">
            Les petits caractères, en langage clair.
          </h2>
          <p className="mt-6 max-w-sm text-ink/60">
            Si votre question n'est pas ici, notre bureau de conciergerie répond en moins de deux heures, tous les jours de l'année.
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
  const [countryCode, setCountryCode] = useState("CH");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const errs: Record<string, string> = {};
    const cleanNum = phone.replace(/\s+/g, "");
    const patternInfo = COUNTRY_PHONE_PATTERNS[countryCode] || COUNTRY_PHONE_PATTERNS["CH"];
    
    if (!cleanNum) {
      errs.phone = "Veuillez entrer un numéro de téléphone";
    } else if (!patternInfo.pattern.test(cleanNum)) {
      errs.phone = `Veuillez entrer un numéro valide (ex: ${patternInfo.example})`;
    }
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
        body: JSON.stringify({ name, email, phone, countryCode, message, leadType: "contact" }),
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
    <section id="contact" className="relative bg-ink py-32">
      <div className="mx-auto max-w-[1400px] px-6">
        <Reveal>
          <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">11 - Contact</span>
              <h2 className="font-display mt-6 text-5xl font-light leading-[1.02] tracking-tight sm:text-6xl">
                Parlez à notre bureau de conciergerie.
              </h2>
              <p className="mt-6 max-w-sm text-white/60">
                Notre équipe répond en moins de deux heures, tous les jours de l'année.
                Partagez vos coordonnées et nous vous contacterons.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { icon: Globe2, label: "Disponible dans 142 pays" },
                  { icon: ShieldCheck, label: "Vos données sont traitées en toute sécurité" },
                  { icon: Sparkles, label: "Gestion de compte dédiée" },
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
                <h3 className="font-display mt-6 text-2xl">Demande reçue.</h3>
                <p className="mt-3 text-white/60">
                  Merci ! Votre demande a bien été reçue.
                  Nous vous contacterons dans les deux heures.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <ContactField
                      id="contact-name"
                      type="text"
                      placeholder="Nom complet"
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
                      placeholder="Adresse e-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <div className="flex gap-2">
                    <Select value={countryCode} onValueChange={setCountryCode}>
                      <SelectTrigger className="w-32 shrink-0 rounded-2xl border border-white/10 bg-white/[0.03] px-4 h-[50px] text-sm text-white transition focus:border-gold/60 focus:bg-white/[0.06] outline-none cursor-pointer">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent position="popper" side="bottom" className="max-h-[300px] z-[9999] border-white/10 bg-ink text-white">
                        {Object.keys(COUNTRY_PHONE_PATTERNS).map((cc) => (
                          <SelectItem key={cc} value={cc} className="cursor-pointer focus:bg-white/10 focus:text-gold">
                            {cc} {COUNTRY_PHONE_PATTERNS[cc].code}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="flex-1">
                      <ContactField
                        id="contact-phone"
                        type="tel"
                        placeholder="Numéro de téléphone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
                </div>
                <textarea
                  id="contact-message"
                  placeholder="Message (optionnel)"
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
                      Envoi en cours…
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
                <span className="font-mono text-[11px] uppercase tracking-[0.25em]">12 - Commencer</span>
                <h2 className="font-display mt-6 text-5xl font-light leading-[1.02] tracking-tight sm:text-8xl">
                  Composez votre <span className="italic">première position</span> en trois minutes.
                </h2>
              </div>
              <div className="flex flex-col gap-3">
                <button onClick={onSignUp} className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-medium text-gold transition hover:scale-[1.02]">
                  Ouvrir un compte <ArrowUpRight className="size-4" />
                </button>
                <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/30 px-7 py-4 text-sm text-ink transition hover:bg-ink/5">
                  Parler à la conciergerie
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
              <LogoIcon className="inline-block h-6 w-6 text-gold" />
              <span className="font-display text-xl">Nova Ledger</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-white/50">
              Une maison éditoriale pour les investisseurs crypto sérieux. Composée à New York, Lisbonne et Singapour.
            </p>
          </div>

          <FooterCol title="Plateforme" links={[
            { label: "Portefeuille", href: "#" },
            { label: "Bureau", href: "#" },
            { label: "Coffre", href: "#" },
            { label: "Staking", href: "#" },
            { label: "Marchés", href: "/#markets" },
          ]} />
          <FooterCol title="Entreprise" links={[
            { label: "À propos", href: "#" },
            { label: "Journal", href: "/#journal" },
            { label: "Carrières", href: "#" },
            { label: "Presse", href: "#" },
            { label: "Contact", href: "#contact" },
          ]} />
          <FooterCol title="Légal" links={[
            { label: "Politique de confidentialité", href: "/privacy" },
            { label: "Conditions générales", href: "/terms" },
          ]} />
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
          <span>© 2026 Nova Ledger Holdings</span>
          <span>SOC 2 Type II · ISO 27001 · Assuré à 500 M$</span>
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
