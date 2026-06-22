import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { AuthModal, type AuthMode } from "@/components/site/AuthModal";
import { Nav } from "@/components/site/Nav";

const SECTIONS = [
  "Acceptation des Conditions",
  "Éligibilité",
  "Objectif du Site Web",
  "Responsabilités de l'Utilisateur",
  "Utilisation Acceptable",
  "Activités Interdites",
  "Propriété Intellectuelle",
  "Exactitude des Informations",
  "Pas de Conseil Financier",
  "Pas de Conseil en Investissement",
  "Divulgation des Risques liés aux Cryptomonnaies",
  "Aucune Garantie de Rendement",
  "Limitation de Responsabilité",
  "Indemnisation",
  "Liens Tiers",
  "Référence à la Politique de Confidentialité",
  "Suspension de l'Accès",
  "Loi Applicable",
  "Résolution des Litiges",
  "Divisibilité",
  "Modification des Conditions",
  "Coordonnées",
];

export default function TermsPage() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("signin");

  useEffect(() => {
    document.title = "Conditions générales - Nova Ledger";
  }, []);

  return (
    <div className="relative min-h-screen bg-ink text-white">
      <Nav onSignIn={() => { setAuthMode("signin"); setAuthOpen(true); }} onSignUp={() => { setAuthMode("signup"); setAuthOpen(true); }} />

      {/* Hero */}
      <section className="relative pt-32 pb-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[400px] bg-[radial-gradient(closest-side,rgba(233,216,74,0.08),transparent_70%)] blur-3xl" />
        <div className="relative mx-auto max-w-[1400px] px-6">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-white/70"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Document Légal
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="font-display mt-6 text-[clamp(3rem,8vw,7rem)] font-light leading-[0.95] tracking-tight"
          >
            Conditions
            <span className="block italic text-gold">générales.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 font-mono text-sm text-white/40"
          >
            Dernière mise à jour : 19 Juin 2026
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-32">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid gap-16 lg:grid-cols-[280px_1fr]">
            {/* Sticky TOC */}
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30 mb-4">Sommaire</div>
                <nav className="space-y-1">
                  {SECTIONS.map((s, i) => (
                    <a
                      key={i}
                      href={`#term-${i}`}
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-white/50 transition hover:bg-white/[0.04] hover:text-white"
                    >
                      <span className="font-mono text-[10px] text-gold">{String(i + 1).padStart(2, "0")}</span>
                      {s}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Body */}
            <div className="space-y-16 text-white/70 leading-relaxed">

              <TermSection id={0} title="Acceptation des Conditions">
                <p>En accédant ou en utilisant le site Web de Nova Ledger sur nova-ledger.io (le "Site Web") ou tout service offert par Nova Ledger Holdings ("Nova Ledger", "nous", "notre" ou "nos"), vous acceptez d'être légalement lié par ces Conditions générales ("Conditions"). Veuillez les lire attentivement avant d'utiliser le Site Web.</p>
                <p>Si vous n'acceptez pas ces Conditions dans leur intégralité, vous devez cesser immédiatement d'utiliser le Site Web et nos services. Votre utilisation continue du Site Web suite à toute mise à jour de ces Conditions constitue votre acceptation des Conditions révisées.</p>
              </TermSection>

              <TermSection id={1} title="Éligibilité">
                <p>En utilisant le Site Web, vous déclarez et garantissez que :</p>
                <ul>
                  <li>Vous avez au moins 18 ans</li>
                  <li>Vous avez la capacité juridique de conclure un accord contraignant</li>
                  <li>Il ne vous est pas interdit d'utiliser le Site Web en vertu des lois de votre juridiction</li>
                  <li>Vous accédez au Site Web uniquement à des fins légales</li>
                </ul>
                <p>Le Site Web n'est pas destiné à être utilisé par des personnes situées dans des juridictions où la distribution ou l'utilisation du contenu serait contraire aux lois ou règlements locaux. Il est de votre responsabilité de vous assurer du respect des lois locales applicables.</p>
              </TermSection>

              <TermSection id={2} title="Objectif du Site Web">
                <p>Le Site Web de Nova Ledger est exploité comme une plateforme numérique fournissant :</p>
                <ul>
                  <li>Du contenu éducatif sur la cryptomonnaie et l'investissement dans les actifs numériques</li>
                  <li>Des informations sur les services d'investissement et de garde de Nova Ledger</li>
                  <li>Un moyen pour les parties intéressées de soumettre des demandes et d'enregistrer leur intérêt pour nos services</li>
                  <li>Des données de marché et des analyses à des fins d'information uniquement</li>
                </ul>
                <p>Le Site Web n'est pas une bourse, un courtier, un concessionnaire, un conseiller en investissement ou une institution financière. Rien sur le Site Web ne constitue une offre ou une sollicitation d'achat ou de vente d'un actif numérique ou d'un titre.</p>
              </TermSection>

              <TermSection id={3} title="Responsabilités de l'Utilisateur">
                <p>En tant qu'utilisateur du Site Web, vous êtes responsable de :</p>
                <ul>
                  <li>Fournir des informations exactes, véridiques et complètes dans tous les formulaires et communications</li>
                  <li>Maintenir la confidentialité de tout identifiant de compte ou jeton de session</li>
                  <li>Toutes les activités qui se produisent sous votre compte ou votre session</li>
                  <li>Nous informer rapidement de toute utilisation non autorisée de votre compte</li>
                  <li>Vous conformer à toutes les lois et réglementations applicables dans votre juridiction</li>
                  <li>N'utiliser le Site Web qu'à des fins personnelles, légales et non commerciales, sauf accord contraire par écrit</li>
                </ul>
              </TermSection>

              <TermSection id={4} title="Utilisation Acceptable">
                <p>Vous acceptez de n'utiliser le Site Web que de manière légale et conforme à ces Conditions. L'utilisation acceptable comprend :</p>
                <ul>
                  <li>Accéder au contenu éducatif pour un apprentissage personnel et non commercial</li>
                  <li>Soumettre de véritables demandes de renseignements via nos formulaires de contact</li>
                  <li>Créer un compte en utilisant des informations personnelles exactes</li>
                  <li>Fournir des commentaires ou poser des questions via les canaux de communication légitimes</li>
                </ul>
              </TermSection>

              <TermSection id={5} title="Activités Interdites">
                <p>Vous ne devez pas utiliser le Site Web pour :</p>
                <ul>
                  <li>Soumettre des informations fausses, trompeuses ou frauduleuses</li>
                  <li>Tenter d'obtenir un accès non autorisé à une partie quelconque du Site Web ou de ses systèmes</li>
                  <li>Introduire des logiciels malveillants, des virus ou d'autres codes malveillants</li>
                  <li>Vous engager dans le grattage de données (scraping), la collecte ou la récolte automatisée de données sans consentement écrit préalable</li>
                  <li>Usurper l'identité de Nova Ledger, de ses employés ou de toute autre personne ou entité</li>
                  <li>Utiliser le Site Web pour faciliter le blanchiment d'argent, la fraude ou d'autres activités financières illégales</li>
                  <li>Contourner ou tenter de contourner les fonctionnalités de sécurité du Site Web</li>
                  <li>Transmettre des communications commerciales non sollicitées (spam)</li>
                  <li>Publier ou transmettre du contenu illégal, diffamatoire, obscène ou harcelant</li>
                </ul>
                <p>La violation de ces interdictions peut entraîner la suspension immédiate de votre accès et, le cas échéant, le signalement aux autorités chargées de l'application de la loi.</p>
              </TermSection>

              <TermSection id={6} title="Propriété Intellectuelle">
                <p>Tout le contenu du Site Web - y compris, mais sans s'y limiter, les textes, graphiques, logos, images, clips audio, téléchargements numériques, compilations de données et logiciels - est la propriété de Nova Ledger Holdings ou de ses fournisseurs de contenu et est protégé par les lois applicables sur la propriété intellectuelle.</p>
                <p>Il vous est accordé une licence limitée, non exclusive et non transférable pour accéder et afficher le contenu du Site Web à des fins personnelles et non commerciales. Cette licence n'inclut pas le droit de :</p>
                <ul>
                  <li>Reproduire, distribuer ou afficher publiquement tout contenu sans consentement écrit préalable</li>
                  <li>Modifier, adapter ou créer des œuvres dérivées basées sur le contenu du Site Web</li>
                  <li>Utiliser tout contenu à des fins commerciales</li>
                  <li>Supprimer ou modifier tout droit d'auteur, marque de commerce ou autre avis de propriété</li>
                </ul>
              </TermSection>

              <TermSection id={7} title="Exactitude des Informations">
                <p>Bien que nous nous efforcions de garantir que les informations figurant sur le Site Web sont exactes et à jour, nous ne faisons aucune déclaration ni ne donnons aucune garantie de quelque nature que ce soit, expresse ou implicite, quant à l'exhaustivité, l'exactitude, la fiabilité, la pertinence ou la disponibilité du Site Web ou des informations qu'il contient.</p>
                <p>Les données de marché, les prix et les statistiques affichés sur le Site Web sont fournis à titre informatif uniquement et peuvent ne pas refléter les conditions du marché en temps réel. Vous ne devez pas vous fier à ces données pour prendre des décisions d'investissement ou de trading.</p>
              </TermSection>

              <TermSection id={8} title="Pas de Conseil Financier">
                <p><strong>Le contenu de ce Site Web ne constitue pas un conseil financier.</strong> Toutes les informations sont fournies à des fins d'information générale et d'éducation uniquement. Rien sur le Site Web ne doit être interprété comme une recommandation, une sollicitation ou une offre d'achat ou de vente d'un instrument financier, d'un actif ou d'un produit.</p>
                <p>Avant de prendre toute décision financière, vous devez demander conseil à un conseiller financier qualifié et agréé qui connaît votre situation financière personnelle, vos objectifs et votre tolérance au risque. Les performances passées ne préjugent pas des résultats futurs.</p>
              </TermSection>

              <TermSection id={9} title="Pas de Conseil en Investissement">
                <p><strong>Nova Ledger n'est pas un conseiller en investissement enregistré, un courtier-négociant ou un planificateur financier.</strong> Rien sur ce Site Web ne constitue un conseil en investissement personnalisé. Le contenu éducatif, les données de marché, les cadres de portefeuille et les outils analytiques fournis sont à des fins d'information générale uniquement.</p>
                <p>Toute décision d'investissement que vous prenez sur la base d'informations obtenues à partir de ce Site Web est prise à votre seule discrétion et à vos propres risques. Nova Ledger décline expressément toute responsabilité pour les pertes d'investissement découlant de la confiance accordée au contenu du Site Web.</p>
              </TermSection>

              <TermSection id={10} title="Divulgation des Risques liés aux Cryptomonnaies">
                <p>La cryptomonnaie et les actifs numériques comportent des risques importants, y compris, mais sans s'y limiter :</p>
                <ul>
                  <li><strong>Volatilité du Marché :</strong> Les prix des actifs numériques peuvent fluctuer de manière spectaculaire sur de courtes périodes. Vous pourriez perdre une partie ou la totalité de votre investissement.</li>
                  <li><strong>Risque de Liquidité :</strong> Les marchés de certains actifs numériques peuvent être minces ou illiquides, ce qui rend difficile l'exécution de transactions aux prix souhaités.</li>
                  <li><strong>Risque Réglementaire :</strong> Le paysage réglementaire des actifs numériques est en évolution. Les changements de loi ou de réglementation pourraient affecter négativement la valeur ou la légalité de la détention de certains actifs.</li>
                  <li><strong>Risque Technologique :</strong> Les réseaux blockchain, les contrats intelligents et les portefeuilles numériques sont sujets à des bugs, des exploits et des pannes techniques imprévues.</li>
                  <li><strong>Risque de Garde :</strong> Les actifs numériques détenus en auto-garde sont irrémédiablement perdus si les clés privées sont perdues ou détruites. Les actifs sur les échanges sont soumis à un risque d'insolvabilité ou de piratage de l'échange.</li>
                  <li><strong>Risque Fiscal :</strong> Le traitement fiscal des actifs numériques varie selon la juridiction et est sujet à changement. Vous êtes seul responsable de votre propre conformité fiscale.</li>
                  <li><strong>Pas de Protection FSCS :</strong> Les actifs numériques ne sont généralement pas protégés par les systèmes de compensation des services financiers.</li>
                </ul>
                <p>Vous ne devriez investir dans les actifs numériques que si vous comprenez parfaitement les risques impliqués et si vous pouvez vous permettre de perdre la totalité de votre investissement.</p>
              </TermSection>

              <TermSection id={11} title="Aucune Garantie de Rendement">
                <p>Nova Ledger n'offre aucune garantie, déclaration ou assurance de quelque nature que ce soit concernant les retours sur investissement, la performance du portefeuille ou la valeur future de tout actif numérique. Toute donnée de performance historique présentée sur le Site Web est à titre illustratif uniquement et n'est pas indicative des résultats futurs.</p>
                <p>Tous les rendements projetés, les chiffres de rendement ou les taux APY mentionnés sur le Site Web sont des estimations basées sur les conditions actuelles et sont sujets à changement sans préavis. Les rendements réels peuvent être sensiblement inférieurs ou négatifs.</p>
              </TermSection>

              <TermSection id={12} title="Limitation de Responsabilité">
                <p>Dans toute la mesure permise par la loi applicable, Nova Ledger Holdings, ses administrateurs, dirigeants, employés, sociétés affiliées, agents, entrepreneurs et concédants de licence ne sauraient être tenus responsables de tout(e) :</p>
                <ul>
                  <li>Dommage direct, indirect, accessoire, consécutif, spécial ou exemplaire</li>
                  <li>Perte de profits, de revenus, de données, de clientèle ou autres pertes intangibles</li>
                  <li>Dommage résultant de votre utilisation ou de votre incapacité à utiliser le Site Web</li>
                  <li>Perte d'investissement découlant de la confiance accordée au contenu du Site Web</li>
                  <li>Accès non autorisé ou altération de vos données ou transmissions</li>
                  <li>Perte résultant de la conduite de tiers</li>
                </ul>
                <p>Dans les juridictions qui n'autorisent pas l'exclusion ou la limitation de certains types de responsabilité, notre responsabilité sera limitée dans la mesure maximale permise par la loi.</p>
              </TermSection>

              <TermSection id={13} title="Indemnisation">
                <p>Vous acceptez d'indemniser, de défendre et de dégager de toute responsabilité Nova Ledger Holdings, ses sociétés affiliées, dirigeants, administrateurs, employés et agents de et contre toute réclamation, responsabilité, dommage, perte et dépense (y compris les frais juridiques raisonnables) découlant de ou liés de quelque manière que ce soit à :</p>
                <ul>
                  <li>Votre utilisation du Site Web</li>
                  <li>Votre violation de ces Conditions</li>
                  <li>Votre violation des droits d'un tiers</li>
                  <li>Toute réclamation découlant des informations que vous soumettez via le Site Web</li>
                </ul>
              </TermSection>

              <TermSection id={14} title="Liens Tiers">
                <p>Le Site Web peut contenir des liens vers des sites Web tiers. Ces liens sont fournis uniquement pour votre commodité. Nova Ledger n'a aucun contrôle sur le contenu de ces sites et n'accepte aucune responsabilité à leur égard ou pour toute perte ou dommage pouvant résulter de votre utilisation de ceux-ci.</p>
                <p>L'inclusion d'un lien vers un site Web tiers n'implique pas l'approbation, l'autorisation ou l'association par Nova Ledger de ce site ou de son contenu, de ses produits ou de ses services.</p>
              </TermSection>

              <TermSection id={15} title="Référence à la Politique de Confidentialité">
                <p>Votre utilisation du Site Web est également régie par notre Politique de confidentialité, qui est intégrée à ces Conditions par référence. La Politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations personnelles. Veuillez l'examiner attentivement.</p>
                <p>En acceptant ces Conditions, vous consentez également aux pratiques décrites dans notre Politique de confidentialité.</p>
              </TermSection>

              <TermSection id={16} title="Suspension de l'Accès">
                <p>Nova Ledger se réserve le droit de suspendre ou de résilier votre accès au Site Web à tout moment, sans préavis, pour quelque raison que ce soit, y compris mais sans s'y limiter :</p>
                <ul>
                  <li>La violation de ces Conditions</li>
                  <li>L'engagement dans des activités interdites</li>
                  <li>La fourniture d'informations fausses ou trompeuses</li>
                  <li>Des actions qui pourraient nuire à d'autres utilisateurs ou à l'intégrité du Site Web</li>
                  <li>Le respect des obligations légales ou des exigences réglementaires</li>
                </ul>
                <p>Nous pouvons également interrompre, modifier ou restreindre le Site Web ou toute partie de celui-ci à tout moment sans préavis.</p>
              </TermSection>

              <TermSection id={17} title="Loi Applicable">
                <p>Ces Conditions seront régies et interprétées conformément aux lois de Chypre, sans égard à ses dispositions relatives aux conflits de lois. Tout litige découlant de ces Conditions sera soumis à la juridiction exclusive des tribunaux de Chypre, sauf si la loi impérative applicable dans votre pays de résidence l'exige autrement.</p>
              </TermSection>

              <TermSection id={18} title="Résolution des Litiges">
                <p>En cas de litige découlant de ou lié à ces Conditions ou à votre utilisation du Site Web, les parties acceptent de tenter d'abord de résoudre le litige par une négociation de bonne foi pendant une période de 30 jours.</p>
                <p>Si le litige ne peut être résolu par la négociation, les parties acceptent de se soumettre à un arbitrage exécutoire conformément aux règles d'arbitrage applicables. L'arbitrage se déroulera en anglais.</p>
                <p>Rien dans cette section n'empêche l'une ou l'autre des parties de demander une injonction ou une autre mesure de redressement équitable à un tribunal compétent pour la protection des informations confidentielles ou des droits de propriété intellectuelle.</p>
              </TermSection>

              <TermSection id={19} title="Divisibilité">
                <p>Si une disposition de ces Conditions est jugée invalide, illégale ou inapplicable par un tribunal compétent, cette disposition sera modifiée dans la mesure minimale nécessaire pour la rendre applicable, ou si la modification n'est pas possible, dissociée de ces Conditions. Les dispositions restantes resteront en vigueur et de plein effet.</p>
              </TermSection>

              <TermSection id={20} title="Modification des Conditions">
                <p>Nova Ledger se réserve le droit de modifier ces Conditions à tout moment. Lorsque nous apportons des modifications importantes, nous mettrons à jour la date de "Dernière mise à jour" en haut de cette page. Nous pouvons également informer les utilisateurs enregistrés par e-mail le cas échéant.</p>
                <p>Votre utilisation continue du Site Web après toute modification de ces Conditions constitue votre acceptation des nouvelles Conditions. Si vous n'acceptez pas les nouvelles Conditions, vous devez cesser d'utiliser le Site Web.</p>
              </TermSection>

              <TermSection id={21} title="Coordonnées">
                <p>Si vous avez des questions ou des préoccupations concernant ces Conditions générales, veuillez nous contacter :</p>
                <ul>
                  <li><strong>E-mail :</strong> legal@nova-ledger.io</li>
                  <li><strong>Société :</strong> Nova Ledger Holdings</li>
                  <li><strong>Adresse enregistrée :</strong> Disponible sur demande</li>
                </ul>
                <p>Pour les demandes liées à la confidentialité, veuillez contacter privacy@nova-ledger.io.</p>
              </TermSection>

            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-ink py-12">
        <div className="mx-auto max-w-[1400px] px-6 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
          <a href="/" className="story-link hover:text-white">← Retour à l'accueil</a>
          <span>© 2026 Nova Ledger Holdings</span>
          <div className="flex gap-6">
            <a href="/privacy" className="story-link hover:text-white">Politique de confidentialité</a>
            <a href="/terms" className="story-link hover:text-white">Conditions générales</a>
          </div>
        </div>
      </footer>

      <AuthModal open={authOpen} mode={authMode} onClose={() => setAuthOpen(false)} onSwitch={setAuthMode} />
    </div>
  );
}

function TermSection({ id, title, children }: { id: number; title: string; children: React.ReactNode }) {
  return (
    <motion.div
      id={`term-${id}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="scroll-mt-32"
    >
      <div className="flex items-baseline gap-4 mb-6">
        <span className="font-mono text-[11px] text-gold">{String(id + 1).padStart(2, "0")}</span>
        <h2 className="font-display text-3xl font-light tracking-tight text-white">{title}</h2>
      </div>
      <div className="pl-8 space-y-4 [&_p]:text-white/70 [&_ul]:list-none [&_ul]:space-y-2 [&_li]:flex [&_li]:gap-2 [&_li]:before:content-['·'] [&_li]:before:text-gold [&_li]:before:shrink-0 [&_strong]:text-white/90">
        {children}
      </div>
    </motion.div>
  );
}
