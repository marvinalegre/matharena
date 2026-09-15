import { Navbar } from "@/components/Navbar";
import { Layout } from "@/layouts/Layout";

interface Props {
  username?: string;
}

export const PrivacyPolicy = ({ username }: Props) => {
  return (
    <Layout
      links={<link rel="stylesheet" href="/css/pages/privacy-policy.css" />}
    >
      <Navbar username={username} />

      <main class="container">
        <header>
          <h1>Privacy Policy</h1>
          <p>Last Updated: September 15, 2026</p>
        </header>

        <p>
          Welcome to Math Arena ("we," "our," or "us"). This Privacy Policy
          explains how we collect, use, and protect information when you use our
          website and services.
        </p>

        <section>
          <h2>Information We Collect</h2>

          <p>We may collect:</p>

          <p>
            <strong>Information You Provide</strong>
          </p>
          <ul>
            <li>Account information</li>
            <li>Quiz responses and results</li>
          </ul>

          <p>
            <strong>Information Collected Automatically</strong>
          </p>
          <ul>
            <li>IP address</li>
            <li>Browser type</li>
            <li>Device information</li>
            <li>Pages visited</li>
            <li>Usage statistics</li>
            <li>Cookies and similar technologies</li>
          </ul>
        </section>

        <section>
          <h2>How We Use Information</h2>
          <p>We use information to:</p>
          <ul>
            <li>Provide and improve our services</li>
            <li>Create and manage user accounts</li>
            <li>Store quiz progress and results</li>
            <li>Respond to support requests</li>
            <li>Analyze website performance</li>
            <li>Prevent fraud and abuse</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2>Cookies</h2>
          <p>
            We may use cookies and similar technologies to improve user
            experience and analyze website usage.
          </p>
          <p>
            Users may disable cookies through browser settings, though some
            features may not function properly.
          </p>
        </section>

        <section>
          <h2>Third-Party Services</h2>
          <p>We may use third-party services such as:</p>
          <ul>
            <li>Hosting providers</li>
            <li>Analytics providers</li>
            <li>Payment processors</li>
            <li>Email service providers</li>
          </ul>
          <p>These providers may process information on our behalf.</p>
        </section>

        <section>
          <h2>Data Security</h2>
          <p>
            We take reasonable measures to protect information from unauthorized
            access, disclosure, or loss. However, no internet transmission or
            storage system is completely secure.
          </p>
        </section>

        <section>
          <h2>Data Retention</h2>
          <p>
            We retain information for as long as necessary to provide services,
            comply with legal obligations, and resolve disputes.
          </p>
        </section>

        <section>
          <h2>Children's Privacy</h2>
          <p>
            Our service is not directed to children under the age of 13. We do
            not knowingly collect personal information from children under 13.
          </p>
        </section>

        <section>
          <h2>Your Rights</h2>
          <p>
            Depending on your location, you may have rights regarding access,
            correction, deletion, or restriction of your personal information.
          </p>
          <p>
            To make a request, contact us at{" "}
            <a href="mailto:marvinalegredev@gmail.com">
              marvinalegredev@gmail.com
            </a>
          </p>
        </section>

        <section>
          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Updated
            versions will be posted on this page.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            Questions about this Privacy Policy may be sent to{" "}
            <a href="mailto:marvinalegredev@gmail.com">
              marvinalegredev@gmail.com
            </a>
          </p>
        </section>
      </main>
    </Layout>
  );
};
