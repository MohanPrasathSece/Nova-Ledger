import { AnimatePresence, motion } from "motion/react";
import { X, Mail, User, Phone, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { LogoIcon } from "@/components/site/LogoIcon";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trackMetaEvent } from "@/lib/metaPixel";
import { trackGoogleAdsConversion } from "@/lib/googleAds";
import { COUNTRY_PHONE_PATTERNS } from "@/lib/phonePatterns";

export type AuthMode = "signin" | "signup";

export function AuthModal({
  open,
  mode,
  onClose,
  onSwitch,
}: {
  open: boolean;
  mode: AuthMode;
  onClose: () => void;
  onSwitch: (mode: AuthMode) => void;
}) {
  const navigate = useNavigate();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const isSignup = mode === "signup";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <button
            aria-label="Close modal backdrop"
            onClick={onClose}
            className="absolute inset-0 bg-ink/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative grid w-full max-w-[940px] overflow-hidden rounded-[28px] border border-white/10 bg-ink shadow-[0_60px_120px_-40px_rgba(0,0,0,0.8)] md:grid-cols-[1.05fr_1fr]"
          >
            {/* Left panel */}
            <div className="relative hidden flex-col justify-between overflow-hidden bg-gold p-10 text-ink md:flex">
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/30 blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-2">
                  <LogoIcon className="inline-block h-6 w-6 text-ink" />
                  <span className="font-display text-xl">Nova Ledger</span>
                </div>
                <h3 className="font-display mt-12 text-4xl font-light leading-[1.05] tracking-tight">
                  {isSignup ? (
                    <>Le bureau est prêt.<br /><span className="italic">Prenez place.</span></>
                  ) : (
                    <>Bon retour.<br /><span className="italic">Le fil est ouvert.</span></>
                  )}
                </h3>
                <p className="relative mt-6 max-w-[280px] text-sm text-ink/70">
                  {isSignup
                    ? "Trois minutes pour vérifier. Une vie d'investissement éditorial patient."
                    : "Reprenez là où vous en étiez - votre portefeuille vous attendait."}
                </p>
              </div>
              <div className="relative font-mono text-[10px] uppercase tracking-[0.25em] text-ink/60">
                Issue 014 · {isSignup ? "Inscription" : "Retour"}
              </div>
            </div>

            {/* Right - form */}
            <div className="relative p-7 sm:p-10">
              <button
                aria-label="Close modal"
                onClick={onClose}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:bg-white/5 hover:text-white"
              >
                <X className="size-4" />
              </button>

              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">
                {isSignup ? "Ouvrir un compte" : "Se connecter"}
              </span>
              <h2 className="font-display mt-3 text-3xl font-light tracking-tight">
                {isSignup ? "Créer votre compte" : "Connexion à Nova Ledger"}
              </h2>

              {isSignup ? (
                <SignupForm onClose={onClose} onSuccess={() => { onClose(); navigate("/learn"); }} />
              ) : (
                <LoginForm onClose={onClose} onNavigateToLearn={() => { onClose(); navigate("/learn"); }} />
              )}

              <p className="mt-8 text-center text-sm text-white/50">
                {isSignup ? "Vous avez déjà un compte ?" : "Nouveau sur Nova Ledger ?"}{" "}
                <button
                  type="button"
                  onClick={() => onSwitch(isSignup ? "signin" : "signup")}
                  className="story-link text-gold"
                >
                  {isSignup ? "Se connecter" : "Ouvrir un compte"}
                </button>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---- LOGIN FORM ---- */
function LoginForm({ onClose, onNavigateToLearn }: { onClose: () => void; onNavigateToLearn: () => void }) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Veuillez saisir une adresse e-mail valide.");
      return;
    }
    setSubmitting(true);
    // Simple email-based login — just close and navigate
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Bon retour ! Notre équipe vous contactera bientôt.");
      onNavigateToLearn();
    }, 800);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
      <Field
        icon={<Mail className="size-4" />}
        type="email"
        name="login-email"
        placeholder="you@email.com"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-medium text-ink transition hover:scale-[1.01] disabled:opacity-60"
      >
        {submitting ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink" />
            Connexion en cours…
          </span>
        ) : "Se connecter"}
      </button>
      <p className="text-center text-xs text-white/40">
        Notre équipe vous contactera sous peu après vérification.
      </p>
    </form>
  );
}

/* ---- SIGNUP FORM — sends to CRM only, no blob ---- */
function SignupForm({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("CH");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const errs: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2) {
      errs.name = "Veuillez entrer votre nom complet";
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = "Veuillez entrer une adresse e-mail valide";
    }
    const cleanNum = phone.replace(/\s+/g, "");
    const patternInfo = COUNTRY_PHONE_PATTERNS[countryCode] || COUNTRY_PHONE_PATTERNS["CH"];
    if (!cleanNum) {
      errs.phone = "Veuillez entrer un numéro de téléphone";
    } else if (!patternInfo.pattern.test(cleanNum)) {
      errs.phone = `Numéro invalide (ex: ${patternInfo.example})`;
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
      const crmRes = await fetch("/api/crm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, countryCode, message: "", leadType: "signup" }),
      });
      const crmData = await crmRes.json().catch(() => ({}));

      if (crmData?.isDuplicate === true) {
        setErrors({ form: "You have already contacted us. Our team will get back to you soon." });
        setSubmitting(false);
        return;
      }

      // Success — CRM accepted or non-blocking error
      setSubmitted(true);
      trackMetaEvent("CompleteRegistration", { content_name: "User Signup", email, phone });
      trackMetaEvent("Lead", { content_name: "Signup Lead", email, phone });
      trackGoogleAdsConversion();
    } catch {
      // Network error — still show success so user isn't blocked
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  // Success screen inside the modal
  if (submitted) {
    return (
      <div className="mt-8 flex flex-col items-center text-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/15">
          <CheckCircle2 className="size-8 text-gold" />
        </div>
        <h3 className="font-display text-2xl font-light text-white">Demande reçue !</h3>
        <p className="text-sm text-white/60 max-w-[280px] leading-relaxed">
          Merci <span className="text-white font-medium">{name}</span>. Notre équipe vous contactera sous peu au <span className="text-white">{phone}</span>.
        </p>
        <button
          type="button"
          onClick={onSuccess}
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-ink transition hover:scale-[1.01]"
        >
          Continuer vers Nova Ledger
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
      <div>
        <Field
          icon={<User className="size-4" />}
          type="text"
          name="signup-name"
          placeholder="Nom complet"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
      </div>
      <div>
        <Field
          icon={<Mail className="size-4" />}
          type="email"
          name="signup-email"
          placeholder="you@email.com"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
      </div>
      <div>
        <div className="flex gap-2">
          <Select value={countryCode} onValueChange={setCountryCode}>
            <SelectTrigger className="w-32 shrink-0 rounded-2xl border border-white/10 bg-white/[0.03] px-4 h-[50px] text-sm text-white transition focus:border-gold/60 focus:bg-white/[0.06] outline-none cursor-pointer">
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="item-aligned" className="max-h-[300px] z-[9999] border-white/10 bg-ink text-white">
              {Object.keys(COUNTRY_PHONE_PATTERNS).map((cc) => (
                <SelectItem key={cc} value={cc} className="cursor-pointer focus:bg-white/10 focus:text-gold">
                  {cc} {COUNTRY_PHONE_PATTERNS[cc].code}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex-1">
            <Field
              icon={<Phone className="size-4" />}
              type="tel"
              name="signup-phone"
              placeholder={COUNTRY_PHONE_PATTERNS[countryCode]?.example || "+1 555 000 0000"}
              autoComplete="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
      </div>

      {errors.form && <p className="text-xs text-red-400 text-center">{errors.form}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-medium text-ink transition hover:scale-[1.01] disabled:opacity-60"
      >
        {submitting ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink" />
            Envoi en cours…
          </span>
        ) : "Être contacté par notre équipe"}
      </button>
      <p className="text-center text-xs text-white/40">
        En vous inscrivant, vous acceptez nos{" "}
        <a href="/terms" className="story-link text-white/60" onClick={onClose}>Conditions</a>{" "}
        et notre{" "}
        <a href="/privacy" className="story-link text-white/60" onClick={onClose}>Politique de confidentialité</a>.
      </p>
    </form>
  );
}

function Field({
  icon,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { icon: React.ReactNode }) {
  return (
    <label className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 transition focus-within:border-gold/60 focus-within:bg-white/[0.06]">
      <span className="text-white/40 transition group-focus-within:text-gold">{icon}</span>
      <input
        {...props}
        className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
      />
    </label>
  );
}
