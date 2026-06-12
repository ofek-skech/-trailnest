'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { Metadata } from 'next';

const faqs = [
  {
    category: 'Orders & Shipping',
    items: [
      { q: 'How long does shipping take?', a: 'Standard orders ship within 1–2 business days and are delivered within 3–5 business days via tracked courier. Express options are available at checkout.' },
      { q: 'Do you offer free shipping?', a: 'Yes! All orders over ₪300 ship free via standard tracked delivery. Orders under ₪300 have a flat shipping fee.' },
      { q: 'Can I track my order?', a: 'Absolutely. Once your order ships, you\'ll receive an email with a tracking number and a link to follow your parcel in real time.' },
      { q: 'What areas do you ship to?', a: 'Shipping zones are being finalised. Contact us at support@trailnest.co for the latest information on delivery to your area.' },
    ],
  },
  {
    category: 'Returns & Warranty',
    items: [
      { q: 'What is your return policy?', a: 'We offer a 30-day hassle-free return window. If you\'re not satisfied for any reason, contact us at support@trailnest.co and we\'ll arrange a full refund.' },
      { q: 'Do products come with a warranty?', a: 'Yes — every TrailNest product is backed by a lifetime warranty against manufacturing defects. If something breaks under normal use, we replace it at no cost.' },
      { q: 'What if my item arrives damaged?', a: 'Please contact us within 48 hours of delivery with a photo of the damage. We\'ll ship a replacement immediately — no need to return the damaged item.' },
    ],
  },
  {
    category: 'Products & Compatibility',
    items: [
      { q: 'Are your products suitable for caravans and campervans?', a: 'Many of our products — including the portable shower, lantern, awning, and storage organiser — are perfectly suited for caravan and campervan setups. Check each product description for specific compatibility notes.' },
      { q: 'Does the 12V compressor work with all vehicles?', a: 'The Portable Air Compressor 12V works with any vehicle that has a standard 12V cigarette lighter socket or accessory port. It\'s compatible with cars, utes, 4x4s, and caravans.' },
      { q: 'What is the water pressure of the camping shower?', a: 'The Portable Camping Shower delivers up to 5 PSI of pressure — enough for a comfortable, consistent flow when the bladder is filled and the pump set to medium output.' },
    ],
  },
  {
    category: 'Account & Payment',
    items: [
      { q: 'What payment methods do you accept?', a: 'We accept all major credit and debit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, and Google Pay. All payments are processed over a secure, encrypted connection.' },
      { q: 'Is my payment information secure?', a: 'Yes. We use industry-standard SSL encryption and never store credit card details on our servers. All payments are processed via PCI-DSS compliant payment partners.' },
      { q: 'Can I change or cancel my order?', a: 'Orders can be modified or cancelled within 2 hours of placement. After that, the order enters fulfilment. Contact us immediately at support@trailnest.co and we\'ll do our best to help.' },
    ],
  },
];

export default function FAQPage() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-tn-600 text-white section-py">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="overline text-sand-400 mb-3">Help Centre</p>
          <h1 className="heading-lg text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-white/70">Everything you need to know about TrailNest gear, orders, and policies.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 section-py space-y-10">
        {faqs.map(group => (
          <div key={group.category}>
            <h2 className="heading-sm text-[#111] mb-5 pb-3 border-b border-[#E5DDD0]">{group.category}</h2>
            <div className="space-y-3">
              {group.items.map((item, i) => {
                const key = `${group.category}-${i}`;
                const isOpen = openItem === key;
                return (
                  <div key={i} className="border border-[#E5DDD0] rounded-xl bg-white overflow-hidden">
                    <button onClick={() => setOpenItem(isOpen ? null : key)}
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer hover:bg-[#F8F5F0] transition-colors"
                      aria-expanded={isOpen}>
                      <span className="font-semibold text-[#111] text-sm">{item.q}</span>
                      <ChevronDown className={`w-4 h-4 text-[#888] flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4">
                        <p className="text-sm text-[#555] leading-relaxed">{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="p-6 bg-tn-600/5 border border-tn-600/20 rounded-2xl text-center">
          <p className="font-bold text-[#111] mb-1">Still have questions?</p>
          <p className="text-sm text-[#888] mb-4">Our team replies within one business day.</p>
          <a href="/contact" className="inline-flex items-center gap-2 px-5 py-3 bg-tn-600 hover:bg-tn-800 text-white font-bold text-sm rounded-xl transition-colors">Contact Us</a>
        </div>
      </div>
    </div>
  );
}
