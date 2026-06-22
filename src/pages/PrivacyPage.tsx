import { useEffect } from "react";
import { motion } from "motion/react";
import { useState } from "react";
import { AuthModal, type AuthMode } from "@/components/site/AuthModal";
import { Nav } from "@/components/site/Nav";

const SECTIONS = [
  "Introduction",
  "Définitions",
  "Informations que nous collectons",
  "Informations fournies volontairement",
  "Informations collectées automatiquement",
  "Finalité de la collecte de données",
  "Base juridique du traitement",
  "Comment nous utilisons vos informations",
  "CRM & Prestataires tiers",
  "Cookies",
  "Technologies de suivi",
  "Sécurité des données",
  "Conservation des données",
  "Transferts internationaux de données",
  "Vos droits",
  "Communications marketing",
  "Confidentialité des enfants",
  "Sites tiers",
  "Mises à jour de la politique",
  "Coordonnées",
];

export default function PrivacyPage() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("signin");

  useEffect(() => {
    document.title = "Politique de confidentialité - Nova Ledger";
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
            Politique de
            <span className="block italic text-gold">confidentialité.</span>
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
                      href={`#section-${i}`}
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
            <div className="prose-lg max-w-none">
              <div className="space-y-16 text-white/70 leading-relaxed">

                <PolicySection id={0} title="Introduction">
                  <p>Nova Ledger Holdings ("Nova Ledger", "nous", "notre" ou "nos") s'engage à protéger votre vie privée et à traiter vos données personnelles avec transparence, intégrité et soin. Cette politique de confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations personnelles lorsque vous visitez notre site Web sur nova-ledger.io (le "Site Web") et lorsque vous interagissez avec nos services.</p>
                  <p>En utilisant le Site Web ou nos services, vous reconnaissez avoir lu, compris et accepté d'être lié par cette politique de confidentialité. Si vous n'êtes pas d'accord, veuillez cesser immédiatement d'utiliser le Site Web.</p>
                  <p>Cette politique vise à se conformer aux lois applicables sur la protection des données, y compris, le cas échéant, le Règlement Général sur la Protection des Données (RGPD), le RGPD du Royaume-Uni et les autres lois locales applicables.</p>
                </PolicySection>

                <PolicySection id={1} title="Définitions">
                  <ul>
                    <li><strong>Données Personnelles</strong> - Toute information identifiant directement ou indirectement une personne physique.</li>
                    <li><strong>Traitement</strong> - Toute opération effectuée sur des données personnelles, y compris la collecte, le stockage, l'utilisation et la suppression.</li>
                    <li><strong>Responsable du Traitement</strong> - Nova Ledger Holdings, l'entité qui détermine les finalités et les moyens du traitement de vos données personnelles.</li>
                    <li><strong>Sous-traitant</strong> - Les tiers qui traitent des données pour notre compte selon nos instructions.</li>
                    <li><strong>CRM</strong> - Système de gestion de la relation client utilisé pour gérer les prospects et les demandes.</li>
                    <li><strong>Utilisateur</strong> - Toute personne accédant au Site Web ou soumettant des informations via nos formulaires.</li>
                  </ul>
                </PolicySection>

                <PolicySection id={2} title="Informations que nous collectons">
                  <p>Nous collectons des informations principalement de deux manières : les informations que vous nous fournissez volontairement et les informations collectées automatiquement lorsque vous utilisez le Site Web.</p>
                  <p>Les catégories de données personnelles que nous pouvons collecter incluent : les informations d'identification (nom, adresse e-mail), les coordonnées (numéro de téléphone), les informations techniques (adresse IP, type de navigateur, identifiants d'appareil) et les données d'utilisation (pages visitées, temps passé, interactions).</p>
                </PolicySection>

                <PolicySection id={3} title="Informations fournies volontairement">
                  <p>Lorsque vous soumettez un formulaire sur le Site Web - y compris nos formulaires de demande et formulaires d'inscription - vous pouvez fournir :</p>
                  <ul>
                    <li>Nom complet</li>
                    <li>Adresse e-mail</li>
                    <li>Numéro de téléphone</li>
                    <li>Contenu du message (facultatif)</li>
                  </ul>
                  <p>Ces informations sont soumises volontairement. Vous n'êtes pas obligé de les fournir, mais le fait de ne pas remplir les champs obligatoires peut nous empêcher de répondre à votre demande ou de créer votre compte.</p>
                  <p><strong>Important :</strong> La connexion au Site Web ne nécessite qu'une adresse e-mail. Nous ne collectons ni ne stockons de mots de passe. Les sessions d'authentification sont gérées en toute sécurité via Vercel Blob Storage.</p>
                </PolicySection>

                <PolicySection id={4} title="Informations collectées automatiquement">
                  <p>Lorsque vous visitez le Site Web, nos serveurs et nos outils d'analyse tiers peuvent collecter automatiquement :</p>
                  <ul>
                    <li>Adresse de Protocole Internet (IP)</li>
                    <li>Type et version du navigateur</li>
                    <li>Système d'exploitation et type d'appareil</li>
                    <li>URL de référence et pages de sortie</li>
                    <li>Pages consultées et heure d'accès</li>
                    <li>Durée de la session et modèles de clics</li>
                  </ul>
                  <p>Ces données sont principalement collectées par le biais de cookies et de technologies de suivi similaires, comme décrit dans les Sections 10 et 11.</p>
                </PolicySection>

                <PolicySection id={5} title="Finalité de la collecte de données">
                  <p>Nous collectons et traitons les données personnelles aux fins suivantes :</p>
                  <ul>
                    <li>Pour répondre aux demandes soumises via nos formulaires de contact</li>
                    <li>Pour traiter les inscriptions de compte et gérer l'accès des utilisateurs</li>
                    <li>Pour transmettre les informations des prospects à notre système CRM pour le suivi par notre équipe</li>
                    <li>Pour améliorer le contenu, la fonctionnalité et l'expérience utilisateur du Site Web</li>
                    <li>Pour envoyer des communications marketing (avec votre consentement)</li>
                    <li>Pour se conformer aux obligations légales</li>
                    <li>Pour détecter et prévenir la fraude et les abus</li>
                  </ul>
                </PolicySection>

                <PolicySection id={6} title="Base juridique du traitement">
                  <p>Conformément au RGPD et à la législation équivalente, nous nous appuyons sur les bases juridiques suivantes pour le traitement de vos données personnelles :</p>
                  <ul>
                    <li><strong>Consentement</strong> - Lorsque vous avez donné un consentement clair, par exemple en soumettant un formulaire ou en vous abonnant à des communications.</li>
                    <li><strong>Intérêts Légitimes</strong> - Lorsque le traitement est nécessaire pour nos intérêts commerciaux légitimes, tels que l'amélioration de nos services et la réponse aux demandes, à condition que ces intérêts ne soient pas supplantés par vos droits.</li>
                    <li><strong>Obligation Légale</strong> - Lorsque le traitement est requis pour se conformer aux lois applicables.</li>
                    <li><strong>Nécessité Contractuelle</strong> - Lorsque le traitement est requis pour fournir les services que vous avez demandés.</li>
                  </ul>
                </PolicySection>

                <PolicySection id={7} title="Comment nous utilisons vos informations">
                  <p>Les informations personnelles soumises via notre Site Web sont utilisées pour :</p>
                  <ul>
                    <li>Répondre à votre demande ou requête spécifique</li>
                    <li>Créer et gérer votre compte utilisateur</li>
                    <li>Transmettre vos coordonnées à notre système CRM pour la gestion de la relation client</li>
                    <li>Vous envoyer des communications pertinentes sur nos services (avec votre consentement)</li>
                    <li>Analyser les modèles d'utilisation agrégés pour améliorer notre Site Web</li>
                    <li>Détecter, enquêter et prévenir les incidents de sécurité</li>
                  </ul>
                  <p>Nous ne vendons, ne louons ni n'échangeons vos informations personnelles à des tiers pour leurs propres besoins de marketing.</p>
                </PolicySection>

                <PolicySection id={8} title="CRM & Prestataires tiers">
                  <p>Lorsque vous soumettez une demande ou créez un compte, vos données personnelles (nom, adresse e-mail, numéro de téléphone et tout message facultatif) sont transmises en toute sécurité à notre fournisseur CRM :</p>
                  <ul>
                    <li><strong>Fournisseur CRM :</strong> CRM Core (inwo.crmcore.me)</li>
                    <li><strong>Finalité :</strong> Gestion des prospects, communications de suivi et administration des comptes</li>
                    <li><strong>Données transmises :</strong> Nom, adresse e-mail, numéro de téléphone, message (si fourni)</li>
                  </ul>
                  <p>Toutes les soumissions au CRM sont effectuées via des appels API sécurisés côté serveur. Les jetons d'authentification ne sont jamais exposés au navigateur ou au code côté client.</p>
                  <p>Nous utilisons également les prestataires de services suivants qui peuvent traiter des données personnelles pour notre compte :</p>
                  <ul>
                    <li><strong>Vercel</strong> - Hébergement, fonctions sans serveur et Blob Storage pour la gestion des sessions</li>
                    <li><strong>Google Fonts</strong> - Diffusion de la typographie (peut enregistrer les métadonnées de la requête)</li>
                  </ul>
                  <p>Tous les sous-traitants tiers sont liés par des accords de traitement des données exigeant qu'ils traitent vos données conformément aux lois applicables.</p>
                </PolicySection>

                <PolicySection id={9} title="Cookies">
                  <p>Notre Site Web utilise des cookies - de petits fichiers texte stockés sur votre appareil - pour améliorer votre expérience et collecter des données d'analyse. Les types de cookies que nous utilisons incluent :</p>
                  <ul>
                    <li><strong>Cookies strictement nécessaires</strong> - Essentiels au fonctionnement du Site Web. Ceux-ci ne peuvent pas être désactivés.</li>
                    <li><strong>Cookies d'analyse</strong> - Nous aident à comprendre comment les visiteurs utilisent le Site Web. Nous pouvons utiliser des données agrégées et anonymisées pour améliorer notre service.</li>
                    <li><strong>Cookies de préférence</strong> - Mémorisent vos choix et paramètres lors de vos visites.</li>
                  </ul>
                  <p>Vous pouvez contrôler les préférences de cookies via les paramètres de votre navigateur. Notez que la désactivation des cookies peut affecter la fonctionnalité de certaines parties du Site Web.</p>
                </PolicySection>

                <PolicySection id={10} title="Technologies de suivi">
                  <p>En plus des cookies, nous pouvons utiliser :</p>
                  <ul>
                    <li><strong>Stockage Local (Local Storage)</strong> - Utilisé pour stocker localement votre jeton de session d'authentification sur votre appareil. Ces données restent sur votre appareil et ne sont transmises à aucun serveur autre que le nôtre.</li>
                    <li><strong>Stockage de Session (Session Storage)</strong> - Stockage temporaire du navigateur effacé à la fin de votre session.</li>
                    <li><strong>Balises Web</strong> - De petites images transparentes qui nous aident à suivre les taux d'ouverture des e-mails et les visites du Site Web dans nos communications.</li>
                  </ul>
                </PolicySection>

                <PolicySection id={11} title="Sécurité des données">
                  <p>Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre l'accès non autorisé, la modification, la divulgation ou la destruction. Ces mesures comprennent :</p>
                  <ul>
                    <li>Toutes les données transmises à nos serveurs sont cryptées à l'aide de TLS (HTTPS)</li>
                    <li>Les jetons API du CRM sont stockés exclusivement en tant que variables d'environnement côté serveur et jamais exposés au code côté client</li>
                    <li>Les sessions d'authentification utilisent des jetons UUID stockés dans Vercel Blob Storage avec des périodes d'expiration définies</li>
                    <li>Les entrées de formulaire sont validées et nettoyées côté serveur avant traitement</li>
                    <li>L'accès aux données personnelles est limité au personnel autorisé ayant un besoin commercial légitime</li>
                  </ul>
                  <p>Aucune méthode de transmission sur Internet n'est sûre à 100 %. Bien que nous nous efforcions de protéger vos données, nous ne pouvons garantir une sécurité absolue et vous encourageons à prendre des mesures pour protéger vos propres informations.</p>
                </PolicySection>

                <PolicySection id={12} title="Conservation des données">
                  <p>Nous conservons les données personnelles aussi longtemps que nécessaire pour atteindre les finalités pour lesquelles elles ont été collectées, y compris pour satisfaire aux exigences légales, réglementaires et de reporting :</p>
                  <ul>
                    <li><strong>Données de demande</strong> - Conservées dans notre CRM jusqu'à 3 ans à compter de la date de soumission</li>
                    <li><strong>Jetons de session d'authentification</strong> - Expirent 30 jours après leur création</li>
                    <li><strong>Données d'analyse</strong> - Conservées sous forme anonymisée et agrégée pendant un maximum de 24 mois</li>
                    <li><strong>Registres légaux</strong> - Conservés pour la période minimale exigée par la loi applicable</li>
                  </ul>
                  <p>À l'expiration ou suite à une demande d'effacement valide, les données sont supprimées ou anonymisées en toute sécurité.</p>
                </PolicySection>

                <PolicySection id={13} title="Transferts internationaux de données">
                  <p>Vos données personnelles peuvent être transférées et traitées dans des pays autres que votre pays de résidence, y compris des pays qui peuvent ne pas offrir le même niveau de protection des données que votre juridiction d'origine.</p>
                  <p>Lorsque nous transférons des données à l'échelle internationale, nous veillons à ce que des garanties appropriées soient en place, notamment : des clauses contractuelles types approuvées par la Commission européenne, des décisions d'adéquation ou d'autres mécanismes de transfert légalement reconnus.</p>
                  <p>Notre infrastructure principale est hébergée sur le réseau mondial de Vercel, avec des données potentiellement traitées aux États-Unis et dans l'Union européenne.</p>
                </PolicySection>

                <PolicySection id={14} title="Vos droits">
                  <p>Selon votre juridiction, vous pouvez avoir les droits suivants concernant vos données personnelles :</p>
                  <ul>
                    <li><strong>Droit d'accès</strong> - Demander une copie des données personnelles que nous détenons à votre sujet</li>
                    <li><strong>Droit de rectification</strong> - Demander la correction de données inexactes ou incomplètes</li>
                    <li><strong>Droit à l'effacement</strong> - Demander la suppression de vos données personnelles ("droit à l'oubli")</li>
                    <li><strong>Droit à la limitation</strong> - Demander que nous limitions la manière dont nous traitons vos données</li>
                    <li><strong>Droit à la portabilité des données</strong> - Recevoir vos données dans un format structuré et lisible par machine</li>
                    <li><strong>Droit d'opposition</strong> - Vous opposer au traitement fondé sur des intérêts légitimes ou pour le marketing direct</li>
                    <li><strong>Droit de retirer votre consentement</strong> - Lorsque le traitement est fondé sur le consentement, le retirer à tout moment</li>
                  </ul>
                  <p>Pour exercer l'un de ces droits, contactez-nous à privacy@nova-ledger.io. Nous vous répondrons dans les 30 jours.</p>
                </PolicySection>

                <PolicySection id={15} title="Communications marketing">
                  <p>Nous pouvons vous envoyer des communications marketing concernant les services de Nova Ledger si vous avez consenti à les recevoir ou si nous avons un intérêt légitime à le faire.</p>
                  <p>Vous pouvez vous désinscrire des communications marketing à tout moment en cliquant sur "Se désabonner" dans n'importe quel e-mail ou en nous contactant directement. Le refus du marketing n'affecte pas les communications liées au service telles que les notifications de compte.</p>
                </PolicySection>

                <PolicySection id={16} title="Confidentialité des enfants">
                  <p>Notre Site Web et nos services ne s'adressent pas aux personnes de moins de 18 ans. Nous ne collectons pas sciemment de données personnelles auprès d'enfants. Si nous apprenons qu'un enfant de moins de 18 ans nous a fourni des données personnelles, nous les supprimerons rapidement.</p>
                  <p>Si vous êtes un parent ou un tuteur et pensez que votre enfant nous a fourni des données personnelles, veuillez nous contacter à privacy@nova-ledger.io.</p>
                </PolicySection>

                <PolicySection id={17} title="Sites tiers">
                  <p>Notre Site Web peut contenir des liens vers des sites Web tiers. Cette politique de confidentialité ne s'applique pas à ces sites Web. Nous n'avons aucun contrôle sur le contenu, les politiques de confidentialité ou les pratiques des sites tiers et n'assumons aucune responsabilité à cet égard. Nous vous encourageons à consulter la politique de confidentialité de chaque site que vous visitez.</p>
                </PolicySection>

                <PolicySection id={18} title="Mises à jour de la politique">
                  <p>Nous pouvons mettre à jour cette politique de confidentialité de temps à autre pour refléter les modifications apportées à nos pratiques, technologies, exigences légales ou autres facteurs. Lorsque nous apportons des modifications importantes, nous mettrons à jour la date de "Dernière mise à jour" en haut de ce document.</p>
                  <p>Nous vous encourageons à consulter cette page périodiquement. Votre utilisation continue du Site Web après toute modification constitue votre acceptation de la politique mise à jour.</p>
                </PolicySection>

                <PolicySection id={19} title="Coordonnées">
                  <p>Si vous avez des questions, des préoccupations ou des demandes concernant cette politique de confidentialité ou la manière dont nous traitons vos données personnelles, veuillez nous contacter :</p>
                  <ul>
                    <li><strong>E-mail :</strong> privacy@nova-ledger.io</li>
                    <li><strong>Société :</strong> Nova Ledger Holdings</li>
                    <li><strong>Adresse enregistrée :</strong> Disponible sur demande</li>
                  </ul>
                  <p>Vous avez également le droit de déposer une plainte auprès de votre autorité de contrôle de la protection des données locale si vous pensez que nous n'avons pas respecté les lois applicables sur la protection des données.</p>
                </PolicySection>

              </div>
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

function PolicySection({ id, title, children }: { id: number; title: string; children: React.ReactNode }) {
  return (
    <motion.div
      id={`section-${id}`}
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
