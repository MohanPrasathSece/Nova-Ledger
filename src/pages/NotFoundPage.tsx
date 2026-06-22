import { Link } from "react-router-dom";
import { motion } from "motion/react";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="text-center"
      >
        <div className="font-display text-[clamp(6rem,20vw,18rem)] font-light leading-none tracking-tighter text-white/5">
          404
        </div>
        <h1 className="font-display -mt-8 text-5xl font-light tracking-tight sm:text-7xl">
          Page introuvable.
        </h1>
        <p className="mt-6 text-white/60">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link
          to="/"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-medium text-ink transition hover:scale-[1.03]"
        >
          Retour à l'accueil
        </Link>
      </motion.div>
    </div>
  );
}
