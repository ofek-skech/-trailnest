// ─── CampIL launch config — update before going live ───────────────────────

export const WHATSAPP_NUMBER = '972XXXXXXXXX'; // Replace with real WhatsApp number (no + or spaces)
export const CONTACT_EMAIL   = 'campil.info@gmail.com';
export const BUSINESS_EMAIL  = 'campil.info@gmail.com'; // Will be updated to business email

export function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function whatsappProductUrl(
  productName: string,
  qty: number,
  price: number,
  pageUrl: string,
): string {
  const msg =
    `היי CampIL! 👋\n` +
    `אני רוצה להזמין:\n\n` +
    `📦 ${productName}\n` +
    `כמות: ${qty}\n` +
    `מחיר: ₪${(price * qty).toLocaleString('he-IL')}\n\n` +
    `🔗 ${pageUrl}`;
  return whatsappUrl(msg);
}

export function whatsappCartUrl(
  items: Array<{ name: string; quantity: number; price: number }>,
  total: number,
): string {
  const lines = items
    .map(i => `• ${i.name} × ${i.quantity} — ₪${(i.price * i.quantity).toLocaleString('he-IL')}`)
    .join('\n');
  const msg =
    `היי CampIL! 👋\n` +
    `אני רוצה להזמין:\n\n` +
    `${lines}\n\n` +
    `סה"כ: ₪${total.toLocaleString('he-IL')}`;
  return whatsappUrl(msg);
}
