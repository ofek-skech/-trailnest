import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Returns Policy — CampIL',
  description: 'CampIL\'s 30-day hassle-free return policy and lifetime warranty information.',
};

export default function ReturnsPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-tn-600 text-white section-py">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="overline text-sand-400 mb-3">Policies</p>
          <h1 className="heading-lg text-white">Returns &amp; Refunds Policy</h1>
          <p className="text-white/60 text-sm mt-2">Last updated: [Date — Coming Soon]</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 section-py">
        <div className="prose text-[#555] space-y-8">
          <section>
            <h2 className="heading-sm text-[#111] mb-3">Our 30-Day Return Guarantee</h2>
            <p>We stand behind every product we sell. If you are not completely satisfied with your purchase for any reason, you may return it within 30 days of the delivery date for a full refund — no questions asked.</p>
            <p>To initiate a return, email us at <a href="mailto:support@campil.co" className="text-tn-600 hover:underline">support@campil.co</a> with your order number and reason for return. We will respond within one business day.</p>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3">Return Conditions</h2>
            <p>To be eligible for a return, the item must be:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Returned within 30 days of the delivery date</li>
              <li>In its original or near-original condition (unused or minimally used)</li>
              <li>Accompanied by proof of purchase (order confirmation email)</li>
            </ul>
            <p className="mt-3">Items that have been significantly used, modified, or damaged through misuse are not eligible for a standard return, but may be covered under our lifetime warranty (see below).</p>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3">Refund Process</h2>
            <p>Once we receive and inspect your returned item, we will process your refund within 3–5 business days. Refunds are issued to the original payment method. Please allow an additional 3–5 business days for the refund to appear in your account depending on your bank or card provider.</p>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3">Lifetime Warranty</h2>
            <p>Every CampIL product is covered by a lifetime warranty against manufacturing defects. If a product fails under normal use due to a manufacturing fault at any point after purchase, we will replace it free of charge.</p>
            <p>This warranty does not cover:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Damage caused by misuse, accident, or negligence</li>
              <li>Normal wear and tear</li>
              <li>Cosmetic damage (scratches, dents, fading) that does not affect function</li>
              <li>Damage caused by failure to follow the product care instructions</li>
            </ul>
            <p className="mt-3">To make a warranty claim, contact us at <a href="mailto:support@campil.co" className="text-tn-600 hover:underline">support@campil.co</a> with your order number and photos of the defect.</p>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3">Exchanges</h2>
            <p>We do not process direct exchanges. If you would like a different product, please return your original order for a refund and place a new order for the item you want. This ensures you receive your new item as quickly as possible.</p>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3">Sale Items</h2>
            <p>Sale items are eligible for the same 30-day return policy as regular-priced items. All sales on discount items are final only if explicitly stated on the product page at the time of purchase.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
