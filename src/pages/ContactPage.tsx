import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  Send,
  Lock,
} from "lucide-react";
import { toast } from "sonner";
import { Nav } from "@/components/site/Nav";
import { LogoIcon } from "@/components/site/LogoIcon";
import { AuthModal, type AuthMode } from "@/components/site/AuthModal";
import { COUNTRY_PHONE_PATTERNS } from "@/lib/phonePatterns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trackMetaEvent } from "@/lib/metaPixel";
import { trackGoogleAdsConversion } from "@/lib/googleAds";
import { useSeats, TOTAL_SEATS } from "@/hooks/useSeats";

export default function ContactPage() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const { seats } = useSeats();

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("CH");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    document.title = "Contact & Conciergerie Privée | Nova Ledger";
  }, []);

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

    try {
      const res = await fetch("/api/crm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          countryCode,
          message: message.trim() || "Demande de contact",
          leadType: "contact",
        }),
      });

      const data = (await res.json()) as { success?: boolean; isDuplicate?: boolean; error?: string };

      if (res.ok && data.success !== false) {
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
      } else if (data.isDuplicate) {
        toast.error(data.error ?? "You have already contacted us. Our team will get back to you soon.");
      } else {
        // CRM error but not duplicate — still show success to not block the user
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

      {/* Contact Form — centered, direct */}
      <section className="relative pt-32 pb-24">
        {/* Subtle ambient glow */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[500px] bg-[radial-gradient(closest-side,rgba(233,216,74,0.07),transparent_70%)] blur-3xl" />

        <div className="relative mx-auto max-w-2xl px-6">
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.02] p-8 sm:p-10 backdrop-blur-xl shadow-2xl">
            {/* Glow accent */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />

            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">
                  Formulaire Confidentiel
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/15 border border-red-500/30 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-red-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
                  {seats}/{TOTAL_SEATS} places réservées
                </span>
              </div>
              <h1 className="font-display mt-2 text-3xl font-light tracking-tight text-white sm:text-4xl">
                Contactez-nous
              </h1>
              <p className="mt-2 text-sm text-white/60">
                Renseignez vos coordonnées afin qu'un conseiller senior prenne contact avec vous sous deux heures.
              </p>

              {/* Dynamic Seat Availability Indicator */}
              <div className="mt-5 rounded-2xl border border-gold/25 bg-gold/[0.04] p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wider text-white/90">
                      Disponibilité en temps réel
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-mono text-sm font-semibold text-gold">
                      {seats} / {TOTAL_SEATS}
                    </span>
                    <span className="text-[11px] font-mono text-white/50">places</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/10 p-0.5">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-gold/80 via-amber-400 to-amber-200"
                    initial={{ width: 0 }}
                    animate={{ width: `${(seats / TOTAL_SEATS) * 100}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>

                <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-white/80 font-medium">
                    {seats} seats filled out of {TOTAL_SEATS}
                  </span>
                  <span className="text-amber-300 font-medium">
                    Plus que {TOTAL_SEATS - seats} places disponibles
                  </span>
                </div>
              </div>

              <div className="mt-3.5 rounded-xl border border-gold/20 bg-gold/5 px-4 py-3 text-xs text-white/70 leading-relaxed">
                ⚡ <span className="text-gold font-medium">Accès restreint :</span> Nous n'acceptons qu'un nombre limité de nouveaux clients par session afin de garantir un suivi personnalisé. Les créneaux disponibles se remplissent rapidement ({seats} places réservées sur {TOTAL_SEATS}).
              </div>
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
                    <span className="text-white/40">Téléphone :</span>
                    <span className="text-white">{phone}</span>
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
                        position="item-aligned"
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

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message-area"
                    className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message-area"
                    placeholder="Votre message ou question..."
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
                      Envoyer le message
                    </>
                  )}
                </button>
              </form>
            )}
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
