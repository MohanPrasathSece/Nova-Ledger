import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { BookOpen, LogOut, Menu, X } from "lucide-react";
import { LogoIcon } from "@/components/site/LogoIcon";

const links = [
  { label: "Plateforme", href: "/#platform" },
  { label: "Marchés", href: "/#markets" },
  { label: "Sécurité", href: "/#security" },
  { label: "Journal", href: "/#journal" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" },
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
  const isContact = location.pathname === "/contact";
  const showNavLinks = isHome || isContact;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      <div className="mx-auto mt-4 max-w-[1400px] px-4 sm:px-6">
        <div className="flex items-center justify-between rounded-full border border-white/10 bg-black/40 px-5 py-3 backdrop-blur-xl sm:px-7">
          <Link to="/" className="flex items-center gap-2">
            <LogoIcon className="inline-block h-6 w-6 text-gold" />
            <span className="font-display text-xl tracking-tight">Nova Ledger</span>
          </Link>

          {showNavLinks && (
            <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
              {links.map((l) => {
                if (l.href === "/contact") {
                  return (
                    <Link
                      key={l.href}
                      to="/contact"
                      className={`story-link transition ${
                        isContact ? "text-gold font-medium" : "hover:text-white"
                      }`}
                    >
                      {l.label}
                    </Link>
                  );
                }

                return (
                  <a
                    key={l.href}
                    href={isHome ? l.href.replace("/", "") : l.href}
                    className="story-link transition hover:text-white"
                  >
                    {l.label}
                  </a>
                );
              })}
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
                  className="hidden text-sm text-white/70 transition hover:text-white sm:inline cursor-pointer"
                >
                  Se connecter
                </button>
                <button
                  onClick={onSignUp}
                  className="rounded-full bg-gold px-4 py-2 text-sm font-medium text-ink transition hover:scale-[1.03] cursor-pointer"
                >
                  Ouvrir un compte
                </button>
              </>
            )}

            {/* Mobile menu toggle button */}
            {showNavLinks && (
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:text-white md:hidden"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {showNavLinks && mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mt-2 rounded-3xl border border-white/10 bg-ink/95 p-6 backdrop-blur-2xl md:hidden shadow-2xl"
            >
              <div className="flex flex-col gap-4 text-base">
                {links.map((l) => {
                  if (l.href === "/contact") {
                    return (
                      <Link
                        key={l.href}
                        to="/contact"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`py-1 transition ${
                          isContact ? "text-gold font-medium" : "text-white/80 hover:text-white"
                        }`}
                      >
                        {l.label}
                      </Link>
                    );
                  }

                  return (
                    <a
                      key={l.href}
                      href={isHome ? l.href.replace("/", "") : l.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-1 text-white/80 transition hover:text-white"
                    >
                      {l.label}
                    </a>
                  );
                })}

                {!isAuthenticated && (
                  <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onSignIn();
                      }}
                      className="w-full text-left py-1 text-sm text-white/70 hover:text-white"
                    >
                      Se connecter
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}