import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Send,
  Globe2,
  Sparkles,
  Lock,
  Building2,
  Plus,
  Minus,
  ArrowUpRight,
  Headphones,
  LineChart,
  MessageSquare,
  Copy,
  Check,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { Nav } from "@/components/site/Nav";
import { LogoIcon } from "@/components/site/LogoIcon";
import { AuthModal, type AuthMode, COUNTRY_PHONE_PATTERNS } from "@/components/site/AuthModal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trackMetaEvent } from "@/lib/metaPixel";
import { trackGoogleAdsConversion } from "@/lib/googleAds";

const INQUIRY_SUBJECTS = [
  "Ouverture de compte Privilège & Onboarding VIP",
  "Table de négociation OTC & Blocs de liquidité (> 100k€)",
  "Conservation dédiée & Sécurité Vault",
  "Staking & Produits de rendement institutionnels",
  "Assistance technique & Accès API",
  "Presse, Médias & Relations Institutionnelles",
  "Autre demande",
];

const PORTFOLIO_RANGES = [
  "< 50 000 €",
  "50 000 € – 250 000 €",
  "250 000 € – 1 000 000 €",
  "> 1 000 000 €",
  "Institutionnel / Trésorerie d'entreprise",
];

const CONTACT_FAQS = [
  {
    q: "Sous quel délai puis-je espérer une réponse à ma demande ?",
    a: "Notre bureau de conciergerie garantit une première réponse qualifiée en moins de deux heures, 24 heures sur 24, 7 jours sur 7. Pour les comptes institutionnels ou les opérations de gré à gré (OTC) urgentes, la mise en relation téléphonique ou par canal sécurisé est quasi-instantanée.",
  },
  {
    q: "Quels sont les prérequis pour accéder à la table de négociation OTC ?",
    a: "La table OTC de Nova Ledger est réservée aux ordres unitaires à partir de 100 000 EUR/CHF/USD. Elle permet une exécution directe sans impact sur le carnet d'ordres public, avec un slippage nul et un règlement en fiat ou stablecoins audité sous quelques minutes.",
  },
  {
    q: "Comment mes données personnelles et financières sont-elles protégées ?",
    a: "Toutes les communications transmises via nos formulaires bénéficient d'un chiffrement matériel AES-256 de bout en bout. Nous appliquons une politique stricte de non-conservation de journaux non nécessaires et respectons rigoureusement la loi fédérale suisse sur la protection des données (LPD) ainsi que le RGPD européen.",
  },
  {
    q: "Puis-je organiser une réunion physique ou en visioconférence ?",
    a: "Absolument. Dès réception de votre message, votre conseiller dédié peut organiser un appel vidéo privé via nos liaisons sécurisées, ou vous accueillir dans l'un de nos bureaux de gestion à Genève, Zurich, New York, Lisbonne ou Singapour.",
  },
  {
    q: "Accompagnez-vous les transferts d'actifs depuis un autre dépositaire ?",
    a: "Oui. Notre équipe conciergerie organise la migration ordonnée et sécurisée de vos portefeuilles existants (depuis exchange, cold storage ou custody tiers) avec vérification cryptographique préalable et confirmation d'adresse sur réseau de test si requis.",
  },
];

const GLOBAL_OFFICES = [
  {
    city: "Genève",
    country: "Suisse",
    role: "Siège Européen & Gestion Privée",
    address: "Rue du Rhône 42, 1204 Genève",
    badge: "Siège Central",
  },
  {
    city: "New York",
    country: "États-Unis",
    role: "Bureau des Marchés Américains",
    address: "50 Hudson Yards, NY 10001",
    badge: "Desk Marchés",
  },
  {
    city: "Lisbonne",
    country: "Portugal",
    role: "Centre Technologique & R&D Web3",
    address: "Avenida da Liberdade 245, 1250-143",
    badge: "Centre Tech",
  },
  {
    city: "Singapour",
    country: "Singapour",
    role: "Desk Asie-Pacifique & Liquidité",
    address: "Marina Bay Financial Centre Tower 1",
    badge: "Desk APAC",
  },
];

export default function ContactPage() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("signin");

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("CH");
  const [subject, setSubject] = useState(INQUIRY_SUBJECTS[0]);
  const [portfolioRange, setPortfolioRange] = useState(PORTFOLIO_RANGES[1]);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copiedEmail, setCopiedEmail] = useState(false);

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    document.title = "Contact & Conciergerie Privée | Nova Ledger";
  }, []);

  function handleCopyEmail(emailStr: string) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(emailStr);
      setCopiedEmail(true);
      toast.success("Adresse e-mail copiée dans le presse-papiers");
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  }

  function validate() {
    const errs: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2) {
      errs.name = "Veuillez renseigner votre nom complet";
    }

    if (!email.trim()) {
      errs.email = "Veuillez renseigner votre adresse e-mail";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = "Veuillez renseigner une adresse e-mail valide";
    }

    const cleanNum = phone.replace(/\s+/g, "");
    const patternInfo = COUNTRY_PHONE_PATTERNS[countryCode] || COUNTRY_PHONE_PATTERNS["CH"];

    if (!cleanNum) {
      errs.phone = "Veuillez entrer un numéro de téléphone";
    } else if (!patternInfo.pattern.test(cleanNum)) {
      errs.phone = `Format attendu pour ${countryCode} (ex: ${patternInfo.example})`;
    }

    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);

    const detailedMessage = `[Objet : ${subject}] [Tranche : ${portfolioRange}]\n${message.trim() || "Aucun message complémentaire."}`;

    try {
      const res = await fetch("/api/crm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          countryCode,
          message: detailedMessage,
          leadType: "contact",
        }),
      });

      const data = (await res.json()) as { success?: boolean; error?: string };

      if (res.ok && data.success) {
        setSuccess(true);
        toast.success(
          "Merci de nous avoir contactés. Votre demande a bien été reçue et notre conciergerie vous répondra dans les plus brefs délais."
        );
        trackMetaEvent("Lead", {
          content_name: "Contact Page Dedicated",
          email: email.trim(),
          phone: phone.trim(),
        });
        trackMetaEvent("Contact");
        trackGoogleAdsConversion();
      } else {
        toast.error(data.error ?? "Échec de l'envoi. Veuillez réessayer.");
      }
    } catch {
      toast.error("Erreur réseau. Veuillez vérifier votre connexion.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleReset() {
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setErrors({});
    setSuccess(false);
  }

  return (
    <div className="relative min-h-screen bg-ink text-white selection:bg-gold selection:text-ink">
      {/* Navigation */}
      <Nav
        onSignIn={() => {
          setAuthMode("signin");
          setAuthOpen(true);
        }}
        onSignUp={() => {
          setAuthMode("signup");
          setAuthOpen(true);
        }}
      />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        {/* Subtle radial ambient background */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(closest-side,rgba(233,216,74,0.09),transparent_70%)] blur-3xl" />
        <div className="pointer-events-none absolute right-10 top-40 h-[400px] w-[400px] rounded-full bg-gold/5 blur-[120px]" />

        <div className="relative mx-auto max-w-[1400px] px-6">
          {/* Breadcrumb & Pill */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 hover:text-white transition"
            >
              Accueil <ChevronRight className="size-3" />
            </Link>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3.5 py-1 font-mono text-[11px] uppercase tracking-[0.25em] text-gold"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
              01 · Conciergerie Privée & Relations Institutionnelles
            </motion.span>
          </div>

          {/* Heading */}
          <div className="mt-8 max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-[clamp(2.5rem,6.5vw,5.5rem)] font-light leading-[1.02] tracking-tight"
            >
              Parlez directement à notre{" "}
              <span className="italic text-gold">bureau privé</span>.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 max-w-2xl text-lg text-white/60 leading-relaxed font-light"
            >
              Pour toute question relative à l'ouverture de compte VIP, l'exécution
              d'ordres de bloc OTC ou la structuration de portefeuilles, nos conseillers
              et ingénieurs de marché sont à votre écoute avec une garantie de réponse en moins de deux heures.
            </motion.p>
          </div>

          {/* Metrics Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6"
          >
            {[
              {
                value: "< 2 heures",
                label: "Temps de réponse moyen",
                sub: "7j/7, 365 jours par an",
              },
              {
                value: "142 Pays",
                label: "Disponibilité globale",
                sub: "Conformité suisse & internationale",
              },
              {
                value: "100k€+",
                label: "Seuil table OTC",
                sub: "Slippage zéro garanti",
              },
              {
                value: "SOC 2 Type II",
                label: "Normes de sécurité",
                sub: "Chiffrement matériel AES-256",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-sm transition hover:border-white/20 hover:bg-white/[0.04]"
              >
                <div className="font-display text-2xl font-light text-gold sm:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm font-medium text-white/90">
                  {stat.label}
                </div>
                <div className="mt-0.5 text-xs text-white/40">{stat.sub}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Split Section: Desk Information + Contact Form */}
      <section className="relative py-12 pb-28">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16 items-start">
            {/* Left Column: Direct channels & Presence */}
            <div className="space-y-8">
              {/* Live status badge */}
              <div className="flex items-center gap-3 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 text-xs font-mono text-emerald-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span>Desks de négociation & conciergerie opérationnels 24/7</span>
              </div>

              {/* Direct desks */}
              <div className="space-y-4">
                {/* Desk 1: Conciergerie Générale */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-gold/30 hover:bg-white/[0.03]">
                  <div className="flex items-center gap-3 text-gold">
                    <Headphones className="size-5" />
                    <span className="font-mono text-xs uppercase tracking-widest text-gold">
                      Bureau de Conciergerie
                    </span>
                  </div>
                  <h2 className="font-display mt-2 text-xl font-light text-white">
                    Assistance Privée & Onboarding VIP
                  </h2>
                  <p className="mt-2 text-sm text-white/60">
                    Pour la gestion de compte, l'initiation aux outils de trading et le support prioritaire dédié aux investisseurs qualifiés.
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3 pt-3 border-t border-white/5 text-sm">
                    <button
                      type="button"
                      onClick={() => handleCopyEmail("concierge@nova-ledger.io")}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/80 transition hover:bg-white/10 hover:text-white"
                      title="Copier l'adresse e-mail"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="size-3 text-emerald-400" />
                          <span>Copié</span>
                        </>
                      ) : (
                        <>
                          <Copy className="size-3 text-white/60" />
                          <span>concierge@nova-ledger.io</span>
                        </>
                      )}
                    </button>
                    <span className="text-xs text-white/40">
                      Disponibilité : 24h/24, 7j/7
                    </span>
                  </div>
                </div>

                {/* Desk 2: Desk OTC & Blocs */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-gold/30 hover:bg-white/[0.03]">
                  <div className="flex items-center gap-3 text-gold">
                    <LineChart className="size-5" />
                    <span className="font-mono text-xs uppercase tracking-widest text-gold">
                      Table OTC & Négociation de Blocs
                    </span>
                  </div>
                  <h2 className="font-display mt-2 text-xl font-light text-white">
                    Liquidité Privée & Exécution Gré à Gré
                  </h2>
                  <p className="mt-2 text-sm text-white/60">
                    Dédié aux ordres supérieurs à 100 000 CHF/EUR/USD. Négociation confidentielle, exécution immédiate, zéro dérapage de prix.
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3 pt-3 border-t border-white/5 text-sm">
                    <a
                      href="mailto:otc@nova-ledger.io"
                      className="inline-flex items-center gap-1.5 text-xs text-gold story-link"
                    >
                      <Mail className="size-3" />
                      otc@nova-ledger.io
                    </a>
                    <span className="text-xs text-white/40">
                      Clé PGP publique disponible sur demande
                    </span>
                  </div>
                </div>

                {/* Desk 3: Conformité & Institutionnel */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-gold/30 hover:bg-white/[0.03]">
                  <div className="flex items-center gap-3 text-gold">
                    <ShieldCheck className="size-5" />
                    <span className="font-mono text-xs uppercase tracking-widest text-gold">
                      Conformité & Institutionnel
                    </span>
                  </div>
                  <h2 className="font-display mt-2 text-xl font-light text-white">
                    Audits, Dépositaire & Rapports Fiscaux
                  </h2>
                  <p className="mt-2 text-sm text-white/60">
                    Pour les fonds d'investissement, family offices et questions réglementaires (KYC/KYB, déclarations fiscales et intégrations API FIX).
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3 pt-3 border-t border-white/5 text-sm">
                    <a
                      href="mailto:compliance@nova-ledger.io"
                      className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white transition"
                    >
                      <Mail className="size-3" />
                      compliance@nova-ledger.io
                    </a>
                  </div>
                </div>
              </div>

              {/* Physical presence / Offices */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="flex items-center gap-2 text-white/80 mb-4">
                  <Building2 className="size-4 text-gold" />
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">
                    Bureaux & Desks Physiques
                  </span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {GLOBAL_OFFICES.map((off) => (
                    <div
                      key={off.city}
                      className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5 transition hover:bg-white/[0.04]"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-display text-base text-white">
                          {off.city}
                        </span>
                        <span className="rounded-full bg-gold/10 px-2 py-0.5 font-mono text-[10px] text-gold">
                          {off.badge}
                        </span>
                      </div>
                      <div className="mt-1 text-xs text-white/70">{off.role}</div>
                      <div className="mt-1 font-mono text-[11px] text-white/40">
                        {off.address}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Dedicated Contact Form */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.02] p-8 sm:p-10 backdrop-blur-xl shadow-2xl">
                {/* Glow accent inside form container */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />

                <div className="mb-8">
                  <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">
                    Formulaire Confidentiel
                  </span>
                  <h2 className="font-display mt-2 text-3xl font-light tracking-tight text-white sm:text-4xl">
                    Transmettez votre demande
                  </h2>
                  <p className="mt-2 text-sm text-white/60">
                    Renseignez vos coordonnées afin qu'un conseiller senior prenne contact avec vous sous deux heures.
                  </p>
                </div>

                {success ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center rounded-2xl border border-gold/30 bg-gold/5 p-10 text-center"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-gold">
                      <CheckCircle2 className="size-9 text-gold" />
                    </div>
                    <h3 className="font-display mt-6 text-2xl font-light text-white">
                      Demande transmise avec succès
                    </h3>
                    <p className="mt-3 max-w-md text-sm text-white/70 leading-relaxed">
                      Merci pour votre confiance. Votre dossier a été transmis à notre bureau de conciergerie. Un conseiller dédié étudie votre profil et vous contactera dans les deux heures.
                    </p>

                    <div className="mt-8 w-full rounded-xl border border-white/10 bg-black/40 p-4 text-left font-mono text-xs text-white/60 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-white/40">Interlocuteur :</span>
                        <span className="text-white">{name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/40">E-mail :</span>
                        <span className="text-white">{email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/40">Sujet :</span>
                        <span className="text-gold truncate max-w-[240px] text-right">{subject}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/40">Statut :</span>
                        <span className="text-emerald-400">En cours d'affectation</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-xs font-mono uppercase tracking-wider text-white transition hover:bg-white/10"
                    >
                      Envoyer une autre demande
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    {/* Nom et Email */}
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="contact-name-input"
                          className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2"
                        >
                          Nom complet *
                        </label>
                        <input
                          id="contact-name-input"
                          type="text"
                          placeholder="ex. Jean de Lavallière"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-gold/60 focus:bg-white/[0.06]"
                          required
                        />
                        {errors.name && (
                          <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="contact-email-input"
                          className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2"
                        >
                          Adresse e-mail professionnelle *
                        </label>
                        <input
                          id="contact-email-input"
                          type="email"
                          placeholder="nom@entreprise.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-gold/60 focus:bg-white/[0.06]"
                          required
                        />
                        {errors.email && (
                          <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Téléphone avec sélecteur pays */}
                    <div>
                      <label
                        htmlFor="contact-phone-input"
                        className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2"
                      >
                        Numéro de téléphone direct *
                      </label>
                      <div className="flex gap-2">
                        <Select value={countryCode} onValueChange={setCountryCode}>
                          <SelectTrigger
                            aria-label="Code pays"
                            className="w-32 shrink-0 rounded-2xl border border-white/10 bg-white/[0.03] px-4 h-[50px] text-sm text-white transition focus:border-gold/60 focus:bg-white/[0.06] outline-none cursor-pointer"
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent
                            position="popper"
                            side="bottom"
                            className="max-h-[300px] z-[9999] border-white/10 bg-ink text-white"
                          >
                            {Object.keys(COUNTRY_PHONE_PATTERNS).map((cc) => (
                              <SelectItem
                                key={cc}
                                value={cc}
                                className="cursor-pointer focus:bg-white/10 focus:text-gold"
                              >
                                {cc} {COUNTRY_PHONE_PATTERNS[cc].code}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <div className="flex-1">
                          <input
                            id="contact-phone-input"
                            type="tel"
                            placeholder={
                              COUNTRY_PHONE_PATTERNS[countryCode]?.example
                                ? `ex. ${COUNTRY_PHONE_PATTERNS[countryCode].example}`
                                : "Numéro de mobile"
                            }
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-gold/60 focus:bg-white/[0.06]"
                            required
                          />
                        </div>
                      </div>
                      {errors.phone && (
                        <p className="mt-1.5 text-xs text-red-400">{errors.phone}</p>
                      )}
                    </div>

                    {/* Sujet de la demande */}
                    <div>
                      <label
                        htmlFor="contact-subject-select"
                        className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2"
                      >
                        Objet de votre prise de contact
                      </label>
                      <Select value={subject} onValueChange={setSubject}>
                        <SelectTrigger
                          id="contact-subject-select"
                          className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 h-[50px] text-sm text-white transition focus:border-gold/60 focus:bg-white/[0.06] outline-none cursor-pointer"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent
                          position="popper"
                          side="bottom"
                          className="max-h-[300px] z-[9999] border-white/10 bg-ink text-white"
                        >
                          {INQUIRY_SUBJECTS.map((subj) => (
                            <SelectItem
                              key={subj}
                              value={subj}
                              className="cursor-pointer focus:bg-white/10 focus:text-gold py-2.5"
                            >
                              {subj}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Tranche d'investissement / Portefeuille */}
                    <div>
                      <span className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2">
                        Volume ou portefeuille d'actifs envisagé (optionnel)
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {PORTFOLIO_RANGES.map((range) => (
                          <button
                            key={range}
                            type="button"
                            onClick={() => setPortfolioRange(range)}
                            className={`rounded-full px-3.5 py-1.5 text-xs transition border ${
                              portfolioRange === range
                                ? "border-gold bg-gold/15 text-gold font-medium"
                                : "border-white/10 bg-white/[0.02] text-white/60 hover:bg-white/[0.05] hover:text-white"
                            }`}
                          >
                            {range}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message détaillé */}
                    <div>
                      <label
                        htmlFor="contact-message-area"
                        className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2"
                      >
                        Précisions sur votre demande (optionnel)
                      </label>
                      <textarea
                        id="contact-message-area"
                        placeholder="Indiquez vos créneaux de disponibilité souhaités, questions spécifiques ou besoins d'intégration..."
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-gold/60 focus:bg-white/[0.06] resize-none"
                      />
                    </div>

                    {/* Disclaimer */}
                    <div className="flex items-start gap-2.5 text-xs text-white/50 pt-1">
                      <Lock className="size-4 shrink-0 text-gold mt-0.5" />
                      <span>
                        Vos informations personnelles sont strictement protégées et traitées sous
                        chiffrement conformément à notre{" "}
                        <Link to="/privacy" className="underline hover:text-gold">
                          Politique de confidentialité
                        </Link>
                        . Aucun démarchage commercial non sollicité.
                      </span>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-medium text-ink transition hover:scale-[1.01] hover:brightness-105 disabled:opacity-60 cursor-pointer shadow-lg shadow-gold/10"
                    >
                      {submitting ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink" />
                          Transmission sécurisée en cours…
                        </>
                      ) : (
                        <>
                          <Send className="size-4" />
                          Transmettre ma demande à la conciergerie
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>



      

      {/* Footer */}
      <footer className="border-t border-white/10 bg-ink py-16">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2">
                <LogoIcon className="inline-block h-6 w-6 text-gold" />
                <span className="font-display text-xl">Nova Ledger</span>
              </div>
              <p className="mt-4 max-w-xs text-sm text-white/50">
                Une maison éditoriale pour les investisseurs crypto sérieux. Composée à New York, Lisbonne, Genève et Singapour.
              </p>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-white/40 mb-4">
                Plateforme
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>
                  <Link to="/#platform" className="story-link hover:text-white">
                    Portefeuille & Coffre
                  </Link>
                </li>
                <li>
                  <Link to="/#markets" className="story-link hover:text-white">
                    Marchés en direct
                  </Link>
                </li>
                <li>
                  <Link to="/#security" className="story-link hover:text-white">
                    Sécurité & Audits
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-white/40 mb-4">
                Entreprise
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>
                  <Link to="/#journal" className="story-link hover:text-white">
                    Journal & Recherche
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="story-link text-gold font-medium">
                    Contact & Conciergerie
                  </Link>
                </li>
                <li>
                  <Link to="/#faq" className="story-link hover:text-white">
                    FAQ Générale
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-white/40 mb-4">
                Légal
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>
                  <Link to="/privacy" className="story-link hover:text-white">
                    Politique de confidentialité
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="story-link hover:text-white">
                    Conditions générales
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
            <span>© 2026 Nova Ledger Holdings</span>
            <span>SOC 2 Type II · ISO 27001 · Assuré à 500 M$</span>
          </div>
        </div>
      </footer>

      {/* Authentication Modal */}
      <AuthModal
        open={authOpen}
        mode={authMode}
        onClose={() => setAuthOpen(false)}
        onSwitch={setAuthMode}
      />
    </div>
  );
}
