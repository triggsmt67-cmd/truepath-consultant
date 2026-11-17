import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const title = "Privacy Policy | True Path Digital";
const description = "How True Path Digital handles website inquiries, Marketing Checkup results, cookies, and website analytics, and how to contact us about your information.";
const url = "https://truepath406.com/privacy-policy";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: "website" },
  twitter: { card: "summary", title, description },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-20 px-6 md:px-12">
        <article className="max-w-3xl mx-auto [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:text-foreground [&_h2]:mb-4 [&_p]:leading-relaxed [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-primary hover:[&_a]:text-primary">
          <header className="py-8 mb-10 border-b border-muted-border">
            <h1 className="font-serif text-5xl md:text-6xl font-medium tracking-tight mb-6">Privacy Policy</h1>
            <p className="text-sm text-muted-text">Effective and last updated: November 17, 2026</p>
            <p className="mt-6">This policy explains how True Path Digital, operated by Trevor Riggs in Lolo, Montana, handles information collected through truepath406.com. Questions can be sent to <a href="mailto:trevor@truepath406.com">trevor@truepath406.com</a>.</p>
          </header>

          <div className="space-y-10 text-muted-text">
            <section aria-labelledby="information-heading">
              <h2 id="information-heading">Information you provide</h2>
              <p>When you request a call or contact us, we receive the information you submit. Depending on the form, this includes your name, email address, business name, phone number, website address, and description of your business challenge. We use it to respond, arrange a conversation, and discuss the services you requested. Please leave passwords, payment information, and sensitive customer information out of your message.</p>
            </section>

            <section aria-labelledby="checkup-heading">
              <h2 id="checkup-heading">Marketing Checkup answers and emails</h2>
              <p>Your Checkup answers stay in the page’s memory unless you choose to email your results. Reloading or resetting the page clears those answers from the page. You can view or print your results without providing an email address.</p>
              <p className="mt-4">If you choose “Email me my results,” your email address and answers are sent to our server and our email delivery provider, Resend, to deliver the copy you requested. The worksheet does not save them to a subscriber list or worksheet database, and requesting a copy does not sign you up for marketing emails. Email delivery records and the delivered message can remain with the email providers; resetting the worksheet does not delete an email already sent.</p>
            </section>

            <section aria-labelledby="analytics-heading">
              <h2 id="analytics-heading">Website analytics and cookies</h2>
              <p>We use Google Analytics 4 through Google Tag Manager to understand how visitors find and use the website. Analytics can collect pages visited, referral sources, browser and device information, approximate location, and interactions with the site. Google Analytics uses cookies and similar identifiers to measure visits and activity.</p>
              <p className="mt-4">We measure article and service-page views, successful inquiry submissions, and clicks on phone and email links. Our custom analytics events do not include the name, email address, phone number, message, or Checkup answers entered in our forms. Clicking a contact link is measured as an interaction; it does not tell us whether a call connected or an email was sent.</p>
              <p className="mt-4">Learn <a href="https://policies.google.com/technologies/partner-sites">how Google uses information from sites that use its services</a> and read <a href="https://policies.google.com/privacy">Google’s Privacy Policy</a>. You can block or delete cookies in your browser and use <a href="https://tools.google.com/dlpage/gaoptout">Google’s Analytics opt-out browser add-on</a> in supported browsers. Blocking cookies may affect some website features.</p>
            </section>

            <section aria-labelledby="providers-heading">
              <h2 id="providers-heading">Service providers and technical information</h2>
              <p>We use Vercel to host and deliver the website, Resend to deliver form and Checkup emails, email services to receive and respond to inquiries, and Google for website measurement. These providers process information needed to provide their services. Hosting and security systems may process IP addresses, request times, browser details, and error or delivery logs to operate the site and investigate problems. The Checkup email endpoint also uses short-lived hashed IP-address and recipient counters to limit abuse.</p>
              <p className="mt-4">See <a href="https://vercel.com/legal/privacy-notice">Vercel’s Privacy Notice</a> and <a href="https://resend.com/legal/privacy-policy">Resend’s Privacy Policy</a> for more about those providers. Information may be processed in the United States or other countries where providers operate. We may also disclose information when required by law or necessary to address fraud, abuse, or security issues.</p>
            </section>

            <section aria-labelledby="retention-heading">
              <h2 id="retention-heading">Retention and security</h2>
              <p>Inquiry information can remain in our business email and related records while we respond, provide requested services, and maintain necessary business records. Hosting logs, analytics, and email delivery records have separate provider settings and retention periods. Clearing a browser page does not clear those records. We use safeguards such as encrypted website connections, but no internet transmission or storage system can be guaranteed completely secure.</p>
            </section>

            <section aria-labelledby="choices-heading">
              <h2 id="choices-heading">Your choices and privacy requests</h2>
              <p>You can use the website and Checkup without submitting a contact form or requesting an email. To ask about information you have provided, request a correction or deletion, or ask us to stop following up, email <a href="mailto:trevor@truepath406.com">trevor@truepath406.com</a>. We may need to verify your identity before acting. We will review requests subject to applicable requirements and any records we need to retain. Please do not send identification documents unless we arrange a secure way to verify your request.</p>
            </section>

            <section aria-labelledby="external-heading">
              <h2 id="external-heading">Other websites and embedded content</h2>
              <p>Links to client websites, social networks, and other resources lead to services with their own privacy practices. If an article includes third-party embedded content, loading or interacting with it may send information to that provider. This policy covers this website; it does not control those external services.</p>
            </section>

            <section aria-labelledby="changes-heading">
              <h2 id="changes-heading">Changes and contact</h2>
              <p>We will update this page and its revision date when these practices change. For questions about this policy or a privacy request, contact Trevor Riggs at <a href="mailto:trevor@truepath406.com">trevor@truepath406.com</a> or <a href="tel:+14068806992">(406) 880-6992</a>. True Path Digital is based in Lolo, Montana.</p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
