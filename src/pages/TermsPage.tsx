import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { AuthModal, type AuthMode } from "@/components/site/AuthModal";
import { Nav } from "@/components/site/Nav";

const SECTIONS = [
  "Acceptance of Terms",
  "Eligibility",
  "Website Purpose",
  "User Responsibilities",
  "Acceptable Use",
  "Prohibited Activities",
  "Intellectual Property",
  "Accuracy of Information",
  "No Financial Advice",
  "No Investment Advice",
  "Cryptocurrency Risk Disclosure",
  "No Guarantee of Returns",
  "Limitation of Liability",
  "Indemnification",
  "Third-Party Links",
  "Privacy Policy Reference",
  "Suspension of Access",
  "Governing Law",
  "Dispute Resolution",
  "Severability",
  "Changes to Terms",
  "Contact Information",
];

export default function TermsPage() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("signin");

  useEffect(() => {
    document.title = "Terms & Conditions - Nova Ledger";
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
            Terms &
            <span className="block italic text-gold">Conditions.</span>
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

              <TermSection id={0} title="Acceptance of Terms">
                <p>By accessing or using the Nova Ledger website at nova-ledger.io (the "Website") or any services offered by Nova Ledger Holdings ("Nova Ledger", "we", "our", or "us"), you agree to be legally bound by these Terms & Conditions ("Terms"). Please read them carefully before using the Website.</p>
                <p>If you do not agree to these Terms in their entirety, you must immediately cease using the Website and our services. Your continued use of the Website following any updates to these Terms constitutes your acceptance of the revised Terms.</p>
              </TermSection>

              <TermSection id={1} title="Eligibility">
                <p>By using the Website, you represent and warrant that:</p>
                <ul>
                  <li>You are at least 18 years of age</li>
                  <li>You have the legal capacity to enter into a binding agreement</li>
                  <li>You are not prohibited from using the Website under the laws of your jurisdiction</li>
                  <li>You are accessing the Website for lawful purposes only</li>
                </ul>
                <p>The Website is not intended for use by persons in jurisdictions where the distribution or use of the content would be contrary to local law or regulation. It is your responsibility to ensure compliance with applicable local laws.</p>
              </TermSection>

              <TermSection id={2} title="Website Purpose">
                <p>The Nova Ledger Website is operated as a digital platform providing:</p>
                <ul>
                  <li>Educational content about cryptocurrency and digital asset investing</li>
                  <li>Information about Nova Ledger's investment and custody services</li>
                  <li>A means for interested parties to submit enquiries and register interest in our services</li>
                  <li>Market data and analysis for informational purposes only</li>
                </ul>
                <p>The Website is not an exchange, broker, dealer, investment adviser, or financial institution. Nothing on the Website constitutes an offer or solicitation to buy or sell any digital asset or security.</p>
              </TermSection>

              <TermSection id={3} title="User Responsibilities">
                <p>As a user of the Website, you are responsible for:</p>
                <ul>
                  <li>Providing accurate, truthful, and complete information in all forms and communications</li>
                  <li>Maintaining the confidentiality of any account credentials or session tokens</li>
                  <li>All activities that occur under your account or session</li>
                  <li>Notifying us promptly of any unauthorised use of your account</li>
                  <li>Complying with all applicable laws and regulations in your jurisdiction</li>
                  <li>Using the Website only for lawful, non-commercial personal purposes unless otherwise agreed in writing</li>
                </ul>
              </TermSection>

              <TermSection id={4} title="Acceptable Use">
                <p>You agree to use the Website only in ways that are lawful and consistent with these Terms. Acceptable use includes:</p>
                <ul>
                  <li>Accessing educational content for personal, non-commercial learning</li>
                  <li>Submitting genuine enquiries through our contact forms</li>
                  <li>Registering for an account using accurate personal information</li>
                  <li>Providing feedback or questions through legitimate communication channels</li>
                </ul>
              </TermSection>

              <TermSection id={5} title="Prohibited Activities">
                <p>You must not use the Website to:</p>
                <ul>
                  <li>Submit false, misleading, or fraudulent information</li>
                  <li>Attempt to gain unauthorised access to any part of the Website or its systems</li>
                  <li>Introduce malware, viruses, or other malicious code</li>
                  <li>Engage in data scraping, harvesting, or automated data collection without prior written consent</li>
                  <li>Impersonate Nova Ledger, its employees, or any other person or entity</li>
                  <li>Use the Website to facilitate money laundering, fraud, or other illegal financial activities</li>
                  <li>Circumvent or attempt to circumvent any security features of the Website</li>
                  <li>Transmit unsolicited commercial communications (spam)</li>
                  <li>Post or transmit content that is unlawful, defamatory, obscene, or harassing</li>
                </ul>
                <p>Violation of these prohibitions may result in immediate suspension of your access and, where appropriate, referral to law enforcement authorities.</p>
              </TermSection>

              <TermSection id={6} title="Intellectual Property">
                <p>All content on the Website - including but not limited to text, graphics, logos, images, audio clips, digital downloads, data compilations, and software - is the property of Nova Ledger Holdings or its content suppliers and is protected by applicable intellectual property laws.</p>
                <p>You are granted a limited, non-exclusive, non-transferable licence to access and view the Website's content for personal, non-commercial purposes. This licence does not include the right to:</p>
                <ul>
                  <li>Reproduce, distribute, or publicly display any content without prior written consent</li>
                  <li>Modify, adapt, or create derivative works based on Website content</li>
                  <li>Use any content for commercial purposes</li>
                  <li>Remove or alter any copyright, trademark, or other proprietary notices</li>
                </ul>
              </TermSection>

              <TermSection id={7} title="Accuracy of Information">
                <p>While we endeavour to ensure that the information on the Website is accurate and up to date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the Website or the information it contains.</p>
                <p>Market data, prices, and statistics displayed on the Website are provided for informational purposes only and may not reflect real-time market conditions. You should not rely on any such data for investment or trading decisions.</p>
              </TermSection>

              <TermSection id={8} title="No Financial Advice">
                <p><strong>The content on this Website does not constitute financial advice.</strong> All information is provided for general informational and educational purposes only. Nothing on the Website should be construed as a recommendation, solicitation, or offer to buy or sell any financial instrument, asset, or product.</p>
                <p>Before making any financial decision, you should seek advice from a qualified, licensed financial adviser who is aware of your personal financial situation, objectives, and risk tolerance. Past performance is not indicative of future results.</p>
              </TermSection>

              <TermSection id={9} title="No Investment Advice">
                <p><strong>Nova Ledger is not a registered investment adviser, broker-dealer, or financial planner.</strong> Nothing on this Website constitutes personalised investment advice. The educational content, market data, portfolio frameworks, and analytical tools provided are for general informational purposes only.</p>
                <p>Any investment decisions you make based on information obtained from this Website are made at your sole discretion and risk. Nova Ledger expressly disclaims any liability for investment losses arising from reliance on Website content.</p>
              </TermSection>

              <TermSection id={10} title="Cryptocurrency Risk Disclosure">
                <p>Cryptocurrency and digital assets involve significant risks, including but not limited to:</p>
                <ul>
                  <li><strong>Market Volatility:</strong> Digital asset prices can fluctuate dramatically within short periods. You could lose some or all of your investment.</li>
                  <li><strong>Liquidity Risk:</strong> Markets for certain digital assets may be thin or illiquid, making it difficult to execute transactions at desired prices.</li>
                  <li><strong>Regulatory Risk:</strong> The regulatory landscape for digital assets is evolving. Changes in law or regulation could adversely affect the value or legality of holding certain assets.</li>
                  <li><strong>Technology Risk:</strong> Blockchain networks, smart contracts, and digital wallets are subject to bugs, exploits, and unforeseen technical failures.</li>
                  <li><strong>Custody Risk:</strong> Digital assets held in self-custody are irretrievably lost if private keys are lost or destroyed. Assets on exchanges are subject to exchange insolvency or hack risk.</li>
                  <li><strong>Tax Risk:</strong> Tax treatment of digital assets varies by jurisdiction and is subject to change. You are solely responsible for your own tax compliance.</li>
                  <li><strong>No FSCS Protection:</strong> Digital assets are generally not protected by financial services compensation schemes.</li>
                </ul>
                <p>You should only invest in digital assets if you fully understand the risks involved and can afford to lose your entire investment.</p>
              </TermSection>

              <TermSection id={11} title="No Guarantee of Returns">
                <p>Nova Ledger makes no guarantee, representation, or warranty of any kind regarding investment returns, portfolio performance, or the future value of any digital asset. Any historical performance data presented on the Website is for illustrative purposes only and is not indicative of future results.</p>
                <p>Any projected returns, yield figures, or APY rates mentioned on the Website are estimates based on current conditions and are subject to change without notice. Actual returns may be materially lower or negative.</p>
              </TermSection>

              <TermSection id={12} title="Limitation of Liability">
                <p>To the fullest extent permitted by applicable law, Nova Ledger Holdings, its directors, officers, employees, affiliates, agents, contractors, and licensors shall not be liable for any:</p>
                <ul>
                  <li>Direct, indirect, incidental, consequential, special, or exemplary damages</li>
                  <li>Loss of profits, revenue, data, goodwill, or other intangible losses</li>
                  <li>Damages arising from your use of or inability to use the Website</li>
                  <li>Investment losses arising from reliance on Website content</li>
                  <li>Unauthorised access to or alteration of your data or transmissions</li>
                  <li>Losses arising from third-party conduct</li>
                </ul>
                <p>In jurisdictions that do not allow the exclusion or limitation of certain types of liability, our liability shall be limited to the maximum extent permitted by law.</p>
              </TermSection>

              <TermSection id={13} title="Indemnification">
                <p>You agree to indemnify, defend, and hold harmless Nova Ledger Holdings, its affiliates, officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or in any way connected with:</p>
                <ul>
                  <li>Your use of the Website</li>
                  <li>Your violation of these Terms</li>
                  <li>Your violation of any third-party rights</li>
                  <li>Any claims arising from information you submit through the Website</li>
                </ul>
              </TermSection>

              <TermSection id={14} title="Third-Party Links">
                <p>The Website may contain links to third-party websites. These links are provided for your convenience only. Nova Ledger has no control over the content of those sites and accepts no responsibility for them or for any loss or damage that may arise from your use of them.</p>
                <p>Inclusion of a link to a third-party website does not imply endorsement, approval, or association by Nova Ledger of that site or its content, products, or services.</p>
              </TermSection>

              <TermSection id={15} title="Privacy Policy Reference">
                <p>Your use of the Website is also governed by our Privacy Policy, which is incorporated into these Terms by reference. The Privacy Policy explains how we collect, use, and protect your personal information. Please review it carefully.</p>
                <p>By agreeing to these Terms, you also consent to the practices described in our Privacy Policy.</p>
              </TermSection>

              <TermSection id={16} title="Suspension of Access">
                <p>Nova Ledger reserves the right to suspend or terminate your access to the Website at any time, without notice, for any reason including but not limited to:</p>
                <ul>
                  <li>Violation of these Terms</li>
                  <li>Engagement in prohibited activities</li>
                  <li>Provision of false or misleading information</li>
                  <li>Actions that may harm other users or the integrity of the Website</li>
                  <li>Compliance with legal obligations or regulatory requirements</li>
                </ul>
                <p>We may also discontinue, modify, or restrict the Website or any part of it at any time without notice.</p>
              </TermSection>

              <TermSection id={17} title="Governing Law">
                <p>These Terms shall be governed by and construed in accordance with the laws of Cyprus, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of Cyprus, unless otherwise required by applicable mandatory law in your country of residence.</p>
              </TermSection>

              <TermSection id={18} title="Dispute Resolution">
                <p>In the event of any dispute arising out of or relating to these Terms or your use of the Website, the parties agree to first attempt to resolve the dispute through good-faith negotiation for a period of 30 days.</p>
                <p>If the dispute cannot be resolved through negotiation, the parties agree to submit to binding arbitration in accordance with applicable arbitration rules. The arbitration shall be conducted in the English language.</p>
                <p>Nothing in this section prevents either party from seeking injunctive or other equitable relief from a court of competent jurisdiction for the protection of confidential information or intellectual property rights.</p>
              </TermSection>

              <TermSection id={19} title="Severability">
                <p>If any provision of these Terms is found by a court of competent jurisdiction to be invalid, illegal, or unenforceable, that provision shall be modified to the minimum extent necessary to make it enforceable, or if modification is not possible, severed from these Terms. The remaining provisions shall continue in full force and effect.</p>
              </TermSection>

              <TermSection id={20} title="Changes to Terms">
                <p>Nova Ledger reserves the right to modify these Terms at any time. When we make material changes, we will update the "Last Updated" date at the top of this page. We may also notify registered users by email where appropriate.</p>
                <p>Your continued use of the Website after any changes to these Terms constitutes your acceptance of the new Terms. If you do not agree to the new Terms, you must stop using the Website.</p>
              </TermSection>

              <TermSection id={21} title="Contact Information">
                <p>If you have any questions or concerns about these Terms & Conditions, please contact us:</p>
                <ul>
                  <li><strong>Email:</strong> legal@nova-ledger.io</li>
                  <li><strong>Company:</strong> Nova Ledger Holdings</li>
                  <li><strong>Registered Address:</strong> Available upon request</li>
                </ul>
                <p>For privacy-related enquiries, please contact privacy@nova-ledger.io.</p>
              </TermSection>

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
