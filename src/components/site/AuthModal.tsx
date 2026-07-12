import { AnimatePresence, motion } from "motion/react";
import { X, Mail, User, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogoIcon } from "@/components/site/LogoIcon";

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
  const { login } = useAuth();
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
            {/* Left - editorial aside */}
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
                <SignupForm onClose={onClose} />
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

/* ---- LOGIN FORM (email only, Vercel Blob auth) ---- */
function LoginForm({ onClose, onNavigateToLearn }: { onClose: () => void; onNavigateToLearn: () => void }) {
  const { login } = useAuth();
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
    const result = await login(email);
    setSubmitting(false);
    if (result.success) {
      toast.success("Bon retour ! Vous êtes maintenant connecté.");
      onNavigateToLearn();
    } else {
      setError(result.error ?? "Échec de la connexion. Veuillez réessayer.");
      toast.error(result.error ?? "La connexion a échoué.");
    }
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
        Nous créerons ou accéderons à votre compte de manière sécurisée via votre e-mail.
      </p>
    </form>
  );
}

/* ---- SIGNUP FORM (name, email, phone → CRM) ---- */
export const COUNTRY_PHONE_PATTERNS: Record<string, { code: string, name: string, pattern: RegExp, example: string }> = {
  CH: { code: "+41", name: "CH", pattern: /^(\+41|0041|0)?[1-9]\d{8}$/, example: "079 123 45 67" },
  FR: { code: "+33", name: "FR", pattern: /^(\+33|0033|0)[1-9]\d{8}$/, example: "06 12 34 56 78" },
  BE: { code: "+32", name: "BE", pattern: /^(\+32|0032|0)[1-9]\d{7,8}$/, example: "0470 12 34 56" },
  CA: { code: "+1", name: "CA", pattern: /^(\+1|001)?[2-9]\d{2}[2-9]\d{6}$/, example: "416 123 4567" },
  US: { code: "+1", name: "US", pattern: /^(\+1|001)?[2-9]\d{2}[2-9]\d{6}$/, example: "212 123 4567" },
  UK: { code: "+44", name: "UK", pattern: /^(\+44|0044|0)7\d{9}$/, example: "07700 900077" },
  DE: { code: "+49", name: "DE", pattern: /^(\+49|0049|0)[1-9]\d{9,10}$/, example: "0151 12345678" },
  ES: { code: "+34", name: "ES", pattern: /^(\+34|0034)?[67]\d{8}$/, example: "612 34 56 78" },
  IT: { code: "+39", name: "IT", pattern: /^(\+39|0039)?3\d{8,9}$/, example: "312 345 6789" },
  NL: { code: "+31", name: "NL", pattern: /^(\+31|0031|0)6\d{8}$/, example: "06 12345678" },
  SE: { code: "+46", name: "SE", pattern: /^(\+46|0046|0)7[02369]\d{7}$/, example: "070 123 45 67" },
  AU: { code: "+61", name: "AU", pattern: /^(\+61|0061|0)4\d{8}$/, example: "0412 345 678" },
  IN: { code: "+91", name: "IN", pattern: /^(\+91|0091)?[6-9]\d{9}$/, example: "91234 56789" },
  AE: { code: "+971", name: "AE", pattern: /^(\+971|00971|0)5[024568]\d{7}$/, example: "050 123 4567" },
  SG: { code: "+65", name: "SG", pattern: /^(\+65|0065)?[89]\d{7}$/, example: "8123 4567" },
  ZA: { code: "+27", name: "ZA", pattern: /^(\+27|0027|0)[6-8]\d{8}$/, example: "071 234 5678" },
  BR: { code: "+55", name: "BR", pattern: /^(\+55|0055)?[1-9]{2}9\d{8}$/, example: "11 91234 5678" },
  MX: { code: "+52", name: "MX", pattern: /^(\+52|0052)?\d{10}$/, example: "55 1234 5678" },
  JP: { code: "+81", name: "JP", pattern: /^(\+81|0081|0)[789]0\d{8}$/, example: "090 1234 5678" },
  CY: { code: "+357", name: "CY", pattern: /^(\+357|00357)?9[679]\d{6}$/, example: "99 123456" },
};

function SignupForm({ onClose }: { onClose: () => void }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("CH");
  const [submitting, setSubmitting] = useState(false);
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
      // 1. Submit to CRM (ignoring errors so validation doesn't block signup)
      try {
        await fetch("/api/crm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, phone, countryCode, message: "", leadType: "signup" }),
        });
      } catch (e: any) {
      const rawMsg = (e?.message || e?.toString() || "");
      if (rawMsg.toLowerCase().includes("already exist") || rawMsg.toLowerCase().includes("already exists")) {
        setErrors({ form: "Account already exists" });
        return { success: false, error: "Account already exists" };
      }

        console.error("CRM error ignored:", e);
      }

      // 2. Log user in via Vercel Blob auth
      const loginResult = await login(email, "signup", name, phone, countryCode);
      setSubmitting(false);

      if (loginResult.success) {
        toast.success("Compte créé ! Bienvenue sur Nova Ledger.");
        onClose();
        navigate("/learn");
      } else {
        toast.error(loginResult.error ?? "L'inscription a échoué.");
      }
    } catch {
      toast.error("Erreur réseau. Veuillez vérifier votre connexion.");
      setSubmitting(false);
    }
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
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="w-28 shrink-0 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white transition focus:border-gold/60 focus:bg-white/[0.06] outline-none cursor-pointer"
            style={{ paddingRight: '2rem', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='rgba(255,255,255,0.4)'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1.2em' }}
          >
            {Object.keys(COUNTRY_PHONE_PATTERNS).map((cc) => (
              <option key={cc} value={cc}>{cc} {COUNTRY_PHONE_PATTERNS[cc].code}</option>
            ))}
          </select>
          <div className="flex-1">
            <Field
              icon={<Phone className="size-4" />}
              type="tel"
              name="signup-phone"
              placeholder="+1 555 000 0000"
              autoComplete="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-medium text-ink transition hover:scale-[1.01] disabled:opacity-60"
      >
        {submitting ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink" />
            Création du compte…
          </span>
        ) : "Ouvrir un compte"}
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