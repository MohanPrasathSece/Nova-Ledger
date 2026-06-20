import { AnimatePresence, motion } from "motion/react";
import { X, Mail, User, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

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
                  <span className="inline-block h-6 w-6 rounded-full bg-ink" />
                  <span className="font-display text-xl">Nova Ledger</span>
                </div>
                <h3 className="font-display mt-12 text-4xl font-light leading-[1.05] tracking-tight">
                  {isSignup ? (
                    <>The desk is set.<br /><span className="italic">Take your seat.</span></>
                  ) : (
                    <>Welcome back.<br /><span className="italic">The tape is open.</span></>
                  )}
                </h3>
                <p className="relative mt-6 max-w-[280px] text-sm text-ink/70">
                  {isSignup
                    ? "Three minutes to verify. A lifetime of patient, editorial investing."
                    : "Pick up where you left off - your portfolio has been waiting."}
                </p>
              </div>
              <div className="relative font-mono text-[10px] uppercase tracking-[0.25em] text-ink/60">
                Issue 014 · {isSignup ? "Onboarding" : "Returning"}
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
                {isSignup ? "Open account" : "Sign in"}
              </span>
              <h2 className="font-display mt-3 text-3xl font-light tracking-tight">
                {isSignup ? "Create your account" : "Sign in to Nova Ledger"}
              </h2>

              {isSignup ? (
                <SignupForm onClose={onClose} />
              ) : (
                <LoginForm onClose={onClose} onNavigateToLearn={() => { onClose(); navigate("/learn"); }} />
              )}

              <p className="mt-8 text-center text-sm text-white/50">
                {isSignup ? "Already have an account?" : "New to Nova Ledger?"}{" "}
                <button
                  type="button"
                  onClick={() => onSwitch(isSignup ? "signin" : "signup")}
                  className="story-link text-gold"
                >
                  {isSignup ? "Sign in" : "Open an account"}
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
      setError("Please enter a valid email address.");
      return;
    }
    setSubmitting(true);
    const result = await login(email);
    setSubmitting(false);
    if (result.success) {
      toast.success("Welcome back! You're now signed in.");
      onNavigateToLearn();
    } else {
      setError(result.error ?? "Login failed. Please try again.");
      toast.error(result.error ?? "Login failed.");
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
            Signing in…
          </span>
        ) : "Sign in"}
      </button>
      <p className="text-center text-xs text-white/40">
        We'll create or access your account securely using your email.
      </p>
    </form>
  );
}

/* ---- SIGNUP FORM (name, email, phone → CRM) ---- */
function SignupForm({ onClose }: { onClose: () => void }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Full name is required.";
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
      // 1. Submit to CRM
      const crmRes = await fetch("/api/crm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message: "" }),
      });
      const crmData = (await crmRes.json()) as { success?: boolean; error?: string };

      if (!crmRes.ok || !crmData.success) {
        toast.error(crmData.error ?? "Signup failed. Please try again.");
        setSubmitting(false);
        return;
      }

      // 2. Log user in via Vercel Blob auth
      const loginResult = await login(email, "signup", name, phone);
      setSubmitting(false);

      if (loginResult.success) {
        toast.success("Account created! Welcome to Nova Ledger.");
        onClose();
        navigate("/learn");
      } else {
        toast.success("Account created! Please sign in.");
        onClose();
      }
    } catch {
      toast.error("Network error. Please check your connection.");
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
          placeholder="Full name"
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
            Creating account…
          </span>
        ) : "Open account"}
      </button>
      <p className="text-center text-xs text-white/40">
        By signing up, you agree to our{" "}
        <a href="/terms" className="story-link text-white/60" onClick={onClose}>Terms</a>{" "}
        and{" "}
        <a href="/privacy" className="story-link text-white/60" onClick={onClose}>Privacy Policy</a>.
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