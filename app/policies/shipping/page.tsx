import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping Policy — CampIL',
  description: 'Everything you need to know about how CampIL ships your order, delivery timeframes, and tracking.',
};

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-tn-600 text-white section-py">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="overline text-sand-400 mb-3">Policies</p>
          <h1 className="heading-lg text-white">Shipping Policy</h1>
          <p className="text-white/60 text-sm mt-2">Last updated: [Date — Coming Soon]</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 section-py">
        <div className="prose text-[#555] space-y-8">
          <section>
            <h2 className="heading-sm text-[#111] mb-3">Processing Time</h2>
            <p>All orders are processed within 1–2 business days. You will receive an order confirmation email immediately after placing your order, and a separate shipping notification with tracking details once your order has been dispatched.</p>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3">Shipping Rates &amp; Delivery Times</h2>
            <div className="border border-[#E5DDD0] rounded-xl overflow-hidden">
              {[
                ['Standard Shipping (orders under ₪300)', '₪35',   '3–5 business days'],
                ['Standard Shipping (orders over ₪300)',  'FREE',  '3–5 business days'],
                ['Express Shipping',                      '₪65',   '1–2 business days'],
              ].map(([method, price, eta], i) => (
                <div key={i} className={`grid grid-cols-3 gap-4 px-5 py-3.5 text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-[#F8F5F0]'}`}>
                  <span className="font-semibold text-[#111]">{method}</span>
                  <span className={price === 'FREE' ? 'text-tn-600 font-bold' : 'text-[#555]'}>{price}</span>
                  <span className="text-[#555]">{eta}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm">Delivery times are estimates only and may vary during peak periods, public holidays, or due to carrier delays outside our control.</p>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3">Tracking Your Order</h2>
            <p>Once your order ships, you will receive an email containing your tracking number and a direct link to track your parcel in real time. You can also contact us at <a href="mailto:support@campil.co" className="text-tn-600 hover:underline">support@campil.co</a> with your order number and we will provide an update.</p>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3">Delivery Areas</h2>
            <p>Shipping zones and carrier partners will be published here once finalised. For questions about delivery to your area, contact us at <a href="mailto:support@campil.co" className="text-tn-600 hover:underline">support@campil.co</a>.</p>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3">Damaged or Lost Orders</h2>
            <p>If your order arrives damaged, please contact us at <a href="mailto:support@campil.co" className="text-tn-600 hover:underline">support@campil.co</a> within 48 hours of delivery with clear photos of the damage. We will arrange a replacement at no cost to you.</p>
            <p>If your tracked order has not arrived within 10 business days of the estimated delivery date, please get in touch and we will investigate with the carrier on your behalf.</p>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3">Incorrect Address</h2>
            <p>It is the customer&apos;s responsibility to ensure the shipping address provided at checkout is accurate and complete. CampIL is not responsible for orders delivered to an incorrect address provided by the customer. If you notice an error in your shipping address after placing an order, please contact us immediately at <a href="mailto:support@campil.co" className="text-tn-600 hover:underline">support@campil.co</a> — we can amend the address before fulfilment if the order has not yet been dispatched.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
