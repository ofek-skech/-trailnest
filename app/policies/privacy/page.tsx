import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — CampIL',
  description: 'How CampIL collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-tn-600 text-white section-py">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="overline text-sand-400 mb-3">Policies</p>
          <h1 className="heading-lg text-white">Privacy Policy</h1>
          <p className="text-white/60 text-sm mt-2">Last updated: [Date — Coming Soon]</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 section-py">
        <div className="prose text-[#555] space-y-8">
          <section>
            <h2 className="heading-sm text-[#111] mb-3">Introduction</h2>
            <p>CampIL (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase from us.</p>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3">Information We Collect</h2>
            <p>We collect information you provide directly to us, including:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Name, email address, and phone number when you place an order or contact us</li>
              <li>Shipping and billing address when you complete a purchase</li>
              <li>Payment information (processed securely by our payment providers — we do not store card details)</li>
              <li>Order history and preferences</li>
              <li>Communications you send to us</li>
            </ul>
            <p className="mt-3">We also automatically collect certain information when you visit our site, including:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>IP address, browser type, and operating system</li>
              <li>Pages viewed, time spent on site, and referring URLs</li>
              <li>Cookie and tracking data (see Cookies section below)</li>
            </ul>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3">How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Process and fulfil your orders</li>
              <li>Send order confirmations, shipping updates, and receipts</li>
              <li>Respond to your questions and provide customer support</li>
              <li>Send you marketing communications if you have opted in</li>
              <li>Improve our website, products, and services</li>
              <li>Comply with applicable legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3">Sharing Your Information</h2>
            <p>We do not sell your personal information to third parties. We may share your information with:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Shipping carriers</strong> to deliver your orders</li>
              <li><strong>Payment processors</strong> to securely process payments</li>
              <li><strong>Email service providers</strong> to send transactional and marketing emails</li>
              <li><strong>Analytics providers</strong> to understand site usage</li>
            </ul>
            <p className="mt-3">All third-party service providers are required to handle your data in accordance with applicable privacy laws.</p>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3">Cookies</h2>
            <p>We use cookies and similar tracking technologies to enhance your browsing experience, remember your cart, and analyse site traffic. You can control cookies through your browser settings, though disabling them may affect certain site functionality.</p>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3">Data Security</h2>
            <p>We implement industry-standard security measures including SSL encryption, secure hosting, and regular security audits to protect your information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3">Your Rights</h2>
            <p>You have the right to access, correct, or request deletion of your personal information. To exercise these rights, contact us at <a href="mailto:support@campil.co" className="text-tn-600 hover:underline">support@campil.co</a>.</p>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3">Contact Us</h2>
            <p>If you have questions about this Privacy Policy or how we handle your personal information, please contact:</p>
            <p>CampIL<br />Email: <a href="mailto:support@campil.co" className="text-tn-600 hover:underline">support@campil.co</a><br />Phone: +972 XX-XXX-XXXX</p>
          </section>
        </div>
      </div>
    </div>
  );
}
