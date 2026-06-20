import { useEffect } from "react";
import { motion } from "motion/react";
import { useState } from "react";
import { AuthModal, type AuthMode } from "@/components/site/AuthModal";
import { Nav } from "@/components/site/Nav";

const SECTIONS = [
  "Introduction",
  "Definitions",
  "Information We Collect",
  "Voluntarily Provided Information",
  "Automatically Collected Information",
  "Purpose of Data Collection",
  "Legal Basis for Processing",
  "How We Use Personal Information",
  "CRM & Third-Party Providers",
  "Cookies",
  "Tracking Technologies",
  "Data Security",
  "Data Retention",
  "International Data Transfers",
  "Your Rights",
  "Marketing Communications",
  "Children's Privacy",
  "Third-Party Websites",
  "Policy Updates",
  "Contact Information",
];

export default function PrivacyPage() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("signin");

  useEffect(() => {
    document.title = "Privacy Policy — Nova Ledger";
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
            Legal Document
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="font-display mt-6 text-[clamp(3rem,8vw,7rem)] font-light leading-[0.95] tracking-tight"
          >
            Privacy
            <span className="block italic text-gold">Policy.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 font-mono text-sm text-white/40"
          >
            Last Updated: 19 June 2026
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
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30 mb-4">Contents</div>
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
                  <p>Nova Ledger Holdings ("Nova Ledger", "we", "our", or "us") is committed to protecting your privacy and handling your personal data with transparency, integrity, and care. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website at nova-ledger.io (the "Website") and when you interact with our services.</p>
                  <p>By using the Website or our services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree, please discontinue use of the Website immediately.</p>
                  <p>This policy is intended to comply with applicable data protection laws including, where relevant, the General Data Protection Regulation (GDPR), the UK GDPR, and other applicable local legislation.</p>
                </PolicySection>

                <PolicySection id={1} title="Definitions">
                  <ul>
                    <li><strong>Personal Data</strong> — Any information that directly or indirectly identifies a natural person.</li>
                    <li><strong>Processing</strong> — Any operation performed on personal data, including collection, storage, use, and deletion.</li>
                    <li><strong>Data Controller</strong> — Nova Ledger Holdings, the entity that determines the purposes and means of processing your personal data.</li>
                    <li><strong>Data Processor</strong> — Third parties who process data on our behalf under our instructions.</li>
                    <li><strong>CRM</strong> — Customer Relationship Management system used to manage leads and enquiries.</li>
                    <li><strong>User</strong> — Any individual who accesses the Website or submits information through our forms.</li>
                  </ul>
                </PolicySection>

                <PolicySection id={2} title="Information We Collect">
                  <p>We collect information in two primary ways: information you voluntarily provide to us, and information automatically collected when you use the Website.</p>
                  <p>The categories of personal data we may collect include: identification information (name, email address), contact information (phone number), technical information (IP address, browser type, device identifiers), and usage data (pages visited, time spent, interactions).</p>
                </PolicySection>

                <PolicySection id={3} title="Information You Voluntarily Provide">
                  <p>When you submit any form on the Website — including our enquiry forms and account registration forms — you may provide:</p>
                  <ul>
                    <li>Full name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Message content (optional)</li>
                  </ul>
                  <p>This information is submitted voluntarily. You are not required to provide it, but failure to provide required fields may prevent us from responding to your enquiry or creating your account.</p>
                  <p><strong>Important:</strong> Login to the Website requires only an email address. We do not collect or store passwords. Authentication sessions are managed securely via Vercel Blob Storage.</p>
                </PolicySection>

                <PolicySection id={4} title="Automatically Collected Information">
                  <p>When you visit the Website, our servers and third-party analytics tools may automatically collect:</p>
                  <ul>
                    <li>Internet Protocol (IP) address</li>
                    <li>Browser type and version</li>
                    <li>Operating system and device type</li>
                    <li>Referring URLs and exit pages</li>
                    <li>Pages viewed and time of access</li>
                    <li>Session duration and click patterns</li>
                  </ul>
                  <p>This data is collected primarily through cookies and similar tracking technologies as described in Sections 10 and 11.</p>
                </PolicySection>

                <PolicySection id={5} title="Purpose of Data Collection">
                  <p>We collect and process personal data for the following purposes:</p>
                  <ul>
                    <li>To respond to enquiries submitted through contact forms</li>
                    <li>To process account registrations and manage user access</li>
                    <li>To transmit lead information to our CRM system for follow-up by our team</li>
                    <li>To improve the Website's content, functionality, and user experience</li>
                    <li>To send marketing communications (with your consent)</li>
                    <li>To comply with legal obligations</li>
                    <li>To detect and prevent fraud and abuse</li>
                  </ul>
                </PolicySection>

                <PolicySection id={6} title="Legal Basis for Processing">
                  <p>Under the GDPR and equivalent legislation, we rely on the following legal bases for processing your personal data:</p>
                  <ul>
                    <li><strong>Consent</strong> — Where you have given clear consent, for example by submitting a form or subscribing to communications.</li>
                    <li><strong>Legitimate Interests</strong> — Where processing is necessary for our legitimate business interests, such as improving our services and responding to enquiries, provided these interests are not overridden by your rights.</li>
                    <li><strong>Legal Obligation</strong> — Where processing is required to comply with applicable laws.</li>
                    <li><strong>Contractual Necessity</strong> — Where processing is required to provide the services you have requested.</li>
                  </ul>
                </PolicySection>

                <PolicySection id={7} title="How We Use Personal Information">
                  <p>Personal information submitted through our Website is used to:</p>
                  <ul>
                    <li>Respond to your specific enquiry or request</li>
                    <li>Create and manage your user account</li>
                    <li>Transmit your details to our CRM system for relationship management</li>
                    <li>Send you relevant communications about our services (with your consent)</li>
                    <li>Analyse aggregate usage patterns to improve our Website</li>
                    <li>Detect, investigate, and prevent security incidents</li>
                  </ul>
                  <p>We do not sell, rent, or trade your personal information to any third party for their own marketing purposes.</p>
                </PolicySection>

                <PolicySection id={8} title="CRM & Third-Party Service Providers">
                  <p>When you submit an enquiry or register an account, your personal data (name, email, phone number, and any optional message) is transmitted securely to our CRM provider:</p>
                  <ul>
                    <li><strong>CRM Provider:</strong> CRM Core (inwo.crmcore.me)</li>
                    <li><strong>Purpose:</strong> Lead management, follow-up communications, and account administration</li>
                    <li><strong>Data Transmitted:</strong> Name, email address, phone number, message (if provided)</li>
                  </ul>
                  <p>All CRM submissions are made via secure server-side API calls. Authentication tokens are never exposed to the browser or client-side code.</p>
                  <p>We also use the following service providers who may process personal data on our behalf:</p>
                  <ul>
                    <li><strong>Vercel</strong> — Hosting, serverless functions, and Blob Storage for session management</li>
                    <li><strong>Google Fonts</strong> — Typography delivery (may log request metadata)</li>
                  </ul>
                  <p>All third-party processors are bound by data processing agreements requiring them to handle your data in accordance with applicable law.</p>
                </PolicySection>

                <PolicySection id={9} title="Cookies">
                  <p>Our Website uses cookies — small text files stored on your device — to enhance your experience and collect analytics data. The types of cookies we use include:</p>
                  <ul>
                    <li><strong>Strictly Necessary Cookies</strong> — Essential for the Website to function. These cannot be disabled.</li>
                    <li><strong>Analytics Cookies</strong> — Help us understand how visitors use the Website. We may use aggregate, anonymised data to improve our service.</li>
                    <li><strong>Preference Cookies</strong> — Remember your choices and settings across visits.</li>
                  </ul>
                  <p>You can control cookie preferences through your browser settings. Note that disabling cookies may affect the functionality of some parts of the Website.</p>
                </PolicySection>

                <PolicySection id={10} title="Tracking Technologies">
                  <p>In addition to cookies, we may use:</p>
                  <ul>
                    <li><strong>Local Storage</strong> — Used to store your authentication session token locally on your device. This data remains on your device and is not transmitted to any server other than our own.</li>
                    <li><strong>Session Storage</strong> — Temporary browser storage cleared when your session ends.</li>
                    <li><strong>Web Beacons</strong> — Small transparent images that help us track email open rates and Website visits in our communications.</li>
                  </ul>
                </PolicySection>

                <PolicySection id={11} title="Data Security">
                  <p>We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. These measures include:</p>
                  <ul>
                    <li>All data transmitted to our servers is encrypted using TLS (HTTPS)</li>
                    <li>CRM API tokens are stored exclusively as server-side environment variables and never exposed to client-side code</li>
                    <li>Authentication sessions use UUID tokens stored in Vercel Blob Storage with defined expiry periods</li>
                    <li>Form inputs are validated and sanitised server-side before processing</li>
                    <li>Access to personal data is restricted to authorised personnel with a legitimate business need</li>
                  </ul>
                  <p>No method of internet transmission is 100% secure. While we strive to protect your data, we cannot guarantee absolute security and encourage you to take steps to protect your own information.</p>
                </PolicySection>

                <PolicySection id={12} title="Data Retention">
                  <p>We retain personal data for as long as necessary to fulfil the purposes for which it was collected, including satisfying legal, regulatory, and reporting requirements:</p>
                  <ul>
                    <li><strong>Enquiry data</strong> — Retained in our CRM for up to 3 years from the date of submission</li>
                    <li><strong>Authentication session tokens</strong> — Expire after 30 days from creation</li>
                    <li><strong>Analytics data</strong> — Retained in anonymised, aggregate form for up to 24 months</li>
                    <li><strong>Legal records</strong> — Retained for the minimum period required by applicable law</li>
                  </ul>
                  <p>Upon expiry or upon a valid erasure request, data is securely deleted or anonymised.</p>
                </PolicySection>

                <PolicySection id={13} title="International Data Transfers">
                  <p>Your personal data may be transferred to and processed in countries outside your country of residence, including countries that may not provide the same level of data protection as your home jurisdiction.</p>
                  <p>Where we transfer data internationally, we ensure appropriate safeguards are in place including: Standard Contractual Clauses approved by the European Commission, adequacy decisions, or other legally recognised transfer mechanisms.</p>
                  <p>Our primary infrastructure is hosted on Vercel's global network, with data potentially processed in the United States and the European Union.</p>
                </PolicySection>

                <PolicySection id={14} title="Your Rights">
                  <p>Depending on your jurisdiction, you may have the following rights regarding your personal data:</p>
                  <ul>
                    <li><strong>Right of Access</strong> — Request a copy of the personal data we hold about you</li>
                    <li><strong>Right to Rectification</strong> — Request correction of inaccurate or incomplete data</li>
                    <li><strong>Right to Erasure</strong> — Request deletion of your personal data ("right to be forgotten")</li>
                    <li><strong>Right to Restriction</strong> — Request that we limit how we process your data</li>
                    <li><strong>Right to Data Portability</strong> — Receive your data in a structured, machine-readable format</li>
                    <li><strong>Right to Object</strong> — Object to processing based on legitimate interests or for direct marketing</li>
                    <li><strong>Right to Withdraw Consent</strong> — Where processing is based on consent, withdraw it at any time</li>
                  </ul>
                  <p>To exercise any of these rights, contact us at privacy@nova-ledger.io. We will respond within 30 days.</p>
                </PolicySection>

                <PolicySection id={15} title="Marketing Communications">
                  <p>We may send you marketing communications about Nova Ledger's services if you have consented to receive them or if we have a legitimate interest in doing so.</p>
                  <p>You may opt out of marketing communications at any time by clicking "Unsubscribe" in any email or by contacting us directly. Opting out of marketing does not affect service-related communications such as account notices.</p>
                </PolicySection>

                <PolicySection id={16} title="Children's Privacy">
                  <p>Our Website and services are not directed at individuals under the age of 18. We do not knowingly collect personal data from children. If we become aware that a child under 18 has provided us with personal data, we will promptly delete it.</p>
                  <p>If you are a parent or guardian and believe your child has provided us with personal data, please contact us at privacy@nova-ledger.io.</p>
                </PolicySection>

                <PolicySection id={17} title="Third-Party Websites">
                  <p>Our Website may contain links to third-party websites. This Privacy Policy does not apply to those websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites. We encourage you to review the privacy policy of every site you visit.</p>
                </PolicySection>

                <PolicySection id={18} title="Policy Updates">
                  <p>We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make material changes, we will update the "Last Updated" date at the top of this document.</p>
                  <p>We encourage you to review this page periodically. Your continued use of the Website after any changes constitutes your acceptance of the updated policy.</p>
                </PolicySection>

                <PolicySection id={19} title="Contact Information">
                  <p>If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your personal data, please contact us:</p>
                  <ul>
                    <li><strong>Email:</strong> privacy@nova-ledger.io</li>
                    <li><strong>Company:</strong> Nova Ledger Holdings</li>
                    <li><strong>Registered Address:</strong> Available upon request</li>
                  </ul>
                  <p>You also have the right to lodge a complaint with your local data protection supervisory authority if you believe we have not complied with applicable data protection law.</p>
                </PolicySection>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-ink py-12">
        <div className="mx-auto max-w-[1400px] px-6 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
          <a href="/" className="story-link hover:text-white">← Back to Home</a>
          <span>© 2026 Nova Ledger Holdings</span>
          <div className="flex gap-6">
            <a href="/privacy" className="story-link hover:text-white">Privacy Policy</a>
            <a href="/terms" className="story-link hover:text-white">Terms & Conditions</a>
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
