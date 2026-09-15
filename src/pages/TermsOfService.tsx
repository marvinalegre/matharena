import { Navbar } from "@/components/Navbar";
import { Layout } from "@/layouts/Layout";

interface Props {
  username?: string;
}

export const TermsOfService = ({ username }: Props) => {
  return (
    <Layout
      links={<link rel="stylesheet" href="/css/pages/privacy-policy.css" />}
    >
      <Navbar username={username} />

      <main class="container">
        <header>
          <h1>Terms of Service</h1>
          <p>Last Updated: September 15, 2026</p>
        </header>

        <p>
          Welcome to Math Arena. By accessing or using our website and services,
          you agree to these Terms of Service.
        </p>

        <section>
          <h2>Eligibility</h2>
          <p>You must be at least 13 years old to use the service.</p>
        </section>

        <section>
          <h2>Accounts</h2>
          <p>If you create an account:</p>
          <ul>
            <li>You are responsible for maintaining account security.</li>
            <li>You are responsible for all activity under your account.</li>
            <li>You must provide accurate information.</li>
            <li>
              We may suspend or terminate accounts that violate these Terms.
            </li>
          </ul>
        </section>

        <section>
          <h2>Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Violate any law or regulation.</li>
            <li>Attempt to gain unauthorized access to systems.</li>
            <li>Interfere with the operation of the service.</li>
            <li>Upload malicious software.</li>
            <li>Use automated tools to abuse the platform.</li>
            <li>Copy or redistribute content without permission.</li>
          </ul>
        </section>

        <section>
          <h2>User Content</h2>
          <p>You retain ownership of content you submit.</p>
          <p>
            By submitting content, you grant us a non-exclusive license to host,
            display, process, and use that content for operating the service.
          </p>
        </section>

        <section>
          <h2>Intellectual Property</h2>
          <p>
            The website, software, branding, and content provided by us are
            owned by or licensed to us and are protected by applicable
            intellectual property laws.
          </p>
        </section>

        <section>
          <h2>Availability</h2>
          <p>
            We may modify, suspend, or discontinue any part of the service at
            any time without prior notice.
          </p>
          <p>We do not guarantee uninterrupted or error-free operation.</p>
        </section>

        <section>
          <h2>Disclaimer</h2>
          <p>The service is provided "as is" and "as available."</p>
          <p>
            To the fullest extent permitted by law, we make no warranties
            regarding accuracy, reliability, availability, or fitness for a
            particular purpose.
          </p>
        </section>

        <section>
          <h2>Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, we shall not be liable for
            any indirect, incidental, special, consequential, or punitive
            damages arising from the use of the service.
          </p>
        </section>

        <section>
          <h2>Indemnification</h2>
          <p>
            You agree to indemnify and hold us harmless from claims, damages,
            liabilities, and expenses arising from your use of the service or
            violation of these Terms.
          </p>
        </section>

        <section>
          <h2>Termination</h2>
          <p>
            We may suspend or terminate access to the service at any time if
            these Terms are violated.
          </p>
        </section>

        <section>
          <h2>Governing Law</h2>
          <p>
            These Terms shall be governed by the laws of the Republic of the
            Philippines.
          </p>
        </section>

        <section>
          <h2>Changes to Terms</h2>
          <p>
            We may update these Terms from time to time. Continued use of the
            service after changes become effective constitutes acceptance of the
            updated Terms.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            Questions regarding these Terms may be directed to{" "}
            <a href="mailto:marvinalegredev@gmail.com">
              marvinalegredev@gmail.com
            </a>
          </p>
        </section>
      </main>
    </Layout>
  );
};
