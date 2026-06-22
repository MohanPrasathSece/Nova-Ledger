import { motion } from "motion/react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { BookOpen, LogOut } from "lucide-react";
import { LogoIcon } from "@/components/site/LogoIcon";

const links = [
  { label: "Plateforme", href: "/#platform" },
  { label: "Marchés", href: "/#markets" },
  { label: "Sécurité", href: "/#security" },
  { label: "Journal", href: "/#journal" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

export function Nav({
  onSignIn,
  onSignUp,
}: {
  onSignIn: () => void;
  onSignUp: () => void;
}) {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto mt-4 flex max-w-[1400px] items-center justify-between rounded-full border border-white/10 bg-black/40 px-5 py-3 backdrop-blur-xl sm:mx-6 sm:px-7">
        <a href="/" className="flex items-center gap-2">
          <LogoIcon className="inline-block h-6 w-6 text-gold" />
          <span className="font-display text-xl tracking-tight">Nova Ledger</span>
        </a>

        {isHome && (
          <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="story-link transition hover:text-white">
                {l.label}
              </a>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <button
                onClick={() => navigate("/learn")}
                className="hidden items-center gap-1.5 text-sm text-white/70 transition hover:text-white sm:inline-flex"
              >
                <BookOpen className="size-4" />
                Mon Apprentissage
              </button>
              <span className="hidden font-mono text-xs text-white/30 sm:inline">
                {user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
              >
                <LogOut className="size-3.5" />
                Se déconnecter
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onSignIn}
                className="hidden text-sm text-white/70 transition hover:text-white sm:inline"
              >
                Se connecter
              </button>
              <button
                onClick={onSignUp}
                className="rounded-full bg-gold px-4 py-2 text-sm font-medium text-ink transition hover:scale-[1.03]"
              >
                Ouvrir un compte
              </button>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
}