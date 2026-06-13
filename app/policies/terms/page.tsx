import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — CampIL',
  description: 'The terms and conditions governing your use of the CampIL website and purchases.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-tn-600 text-white section-py">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="overline text-sand-400 mb-3">Policies</p>
          <h1 className="heading-lg text-white">Terms of Service</h1>
          <p className="text-white/60 text-sm mt-2">Last updated: [Date — Coming Soon]</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 section-py">
        <div className="prose text-[#555] space-y-8">
          <section>
            <h2 className="heading-sm text-[#111] mb-3">1. Agreement to Terms</h2>
            <p>By accessing or using the CampIL website or purchasing products from us, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, you must not use our website or services.</p>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3">2. Products &amp; Pricing</h2>
            <p>We reserve the right to modify or discontinue products at any time without notice. Prices are displayed in the local currency and are inclusive of applicable taxes unless otherwise stated. We reserve the right to change prices at any time. Price changes will not affect orders already confirmed.</p>
            <p>Product images and descriptions are provided for illustrative purposes. We strive for accuracy but cannot guarantee that colours, dimensions, or features exactly match the physical product.</p>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3">3. Orders &amp; Payment</h2>
            <p>By placing an order, you represent that you are at least 18 years of age and are authorised to use the payment method provided. We reserve the right to refuse or cancel any order at our discretion, including in cases of suspected fraud or pricing errors.</p>
            <p>An order confirmation email does not constitute acceptance of your order. Acceptance occurs when we dispatch the goods and send a shipping confirmation.</p>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3">4. Intellectual Property</h2>
            <p>All content on this website — including text, images, graphics, logos, and software — is the property of CampIL or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.</p>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3">5. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, CampIL shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or products. Our total liability shall not exceed the amount paid for the specific product giving rise to the claim.</p>
            <p>Nothing in these terms limits our liability for death or personal injury caused by our negligence, fraud, or any other liability that cannot be excluded by law.</p>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3">6. Prohibited Uses</h2>
            <p>You must not use our website or services to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Submit false, misleading, or fraudulent information</li>
              <li>Attempt to gain unauthorised access to our systems</li>
              <li>Transmit harmful, offensive, or disruptive content</li>
              <li>Resell our products commercially without our written consent</li>
            </ul>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3">7. Governing Law</h2>
            <p>The governing law and jurisdiction for these Terms will be confirmed when our legal registration is finalised. For now, all disputes will be handled in good faith directly between the parties. Contact us at <a href="mailto:support@campil.co" className="text-tn-600 hover:underline">support@campil.co</a>.</p>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3">8. Changes to Terms</h2>
            <p>We may revise these Terms at any time. The &ldquo;Last updated&rdquo; date at the top of this page will reflect the most recent changes. Continued use of our website after changes constitutes acceptance of the revised Terms.</p>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3">9. Contact</h2>
            <p>For questions about these Terms, contact us at <a href="mailto:support@campil.co" className="text-tn-600 hover:underline">support@campil.co</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
