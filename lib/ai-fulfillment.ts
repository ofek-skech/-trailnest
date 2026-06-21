import Anthropic from '@anthropic-ai/sdk';

export type FulfillmentStatus =
  | 'pending_review'
  | 'ai_analyzed'
  | 'pending_approval'
  | 'supplier_ordered'
  | 'shipped'
  | 'completed'
  | 'problem';

export interface SupplierProductLink {
  product_name: string;
  search_query: string;
  estimated_cost_ils: number;
}

export interface AIRecommendation {
  risk_level: 'low' | 'medium' | 'high';
  risk_notes: string[];
  checks_before_ordering: string[];
  missing_data: string[];
  supplier_name: string;
  supplier_product_links: SupplierProductLink[];
  formatted_address: string;
  supplier_order_text: string;
  estimated_total_cost_ils: number;
  estimated_profit_ils: number;
  estimated_shipping_days: number;
  notes: string;
}

export type CustomerMessageType =
  | 'order_received'
  | 'supplier_ordered'
  | 'tracking_received'
  | 'delay'
  | 'refund';

export interface CustomerMessage {
  whatsapp: string;
  email_subject: string;
  email_body: string;
}

interface OrderData {
  order_id: string;
  created_at: string;
  customer_name: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  notes: string | null;
  items_json: Array<{ id: string; name: string; price: number; quantity: number }>;
  subtotal: number;
  shipping: number;
  total: number;
  payment_status: string;
}

function getClient() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

function buildOrderSummary(order: OrderData): string {
  return `
הזמנה: ${order.order_id}
תאריך: ${new Date(order.created_at).toLocaleDateString('he-IL')}
סטטוס תשלום: ${order.payment_status === 'paid' ? 'שולם ✓' : order.payment_status}

פרטי לקוח:
- שם: ${order.customer_name}
- טלפון: ${order.phone}
- אימייל: ${order.email}
- עיר: ${order.city}
- כתובת: ${order.address}
${order.notes ? `- הערות: "${order.notes}"` : ''}

מוצרים:
${order.items_json
  .map(
    (item) =>
      `- ${item.quantity}× ${item.name} (מק"ט: ${item.id}) — ₪${item.price} ליחידה = ₪${item.price * item.quantity}`
  )
  .join('\n')}

סיכום: ₪${order.subtotal} + משלוח ₪${order.shipping} = סה"כ ₪${order.total}
`.trim();
}

export async function analyzeOrder(order: OrderData): Promise<AIRecommendation> {
  const client = getClient();

  const prompt = `אתה עוזר AI לניהול הזמנות של CampIL — חנות ציוד קמפינג וחוץ ישראלית.
תפקידך: לנתח הזמנות ולהכין המלצות לרכישה מספק. אינך מבצע הזמנות בעצמך.

הקשר עסקי:
- חנות dropshipping ישראלית לציוד קמפינג
- ספקים אופייניים: AliExpress (14-21 ימי משלוח, זול יותר), Amazon.co.il (2-5 ימים, יקר יותר), ספקים מקומיים
- עלות ספק טיפוסית: 35-45% ממחיר המכירה
- משלוח לספק: ~₪15 לרוב

סיכון גבוה: כתובת לא שלמה, תשלום לא אושר, הזמנה גדולה מאוד, ערות חשודות
סיכון בינוני: ספק אחד בלבד, זמן משלוח ארוך, אין מספר טלפון
סיכון נמוך: הכל תקין, כתובת ברורה, תשלום מאושר

חזור **אך ורק** ב-JSON תקין בפורמט הזה (ללא טקסט נוסף, ללא markdown):
{
  "risk_level": "low",
  "risk_notes": [],
  "checks_before_ordering": [],
  "missing_data": [],
  "supplier_name": "AliExpress",
  "supplier_product_links": [
    { "product_name": "שם מוצר בעברית", "search_query": "search term in English", "estimated_cost_ils": 50 }
  ],
  "formatted_address": "שם | טלפון | כתובת מלאה | עיר | ישראל",
  "supplier_order_text": "Order text ready to copy to supplier",
  "estimated_total_cost_ils": 100,
  "estimated_profit_ils": 80,
  "estimated_shipping_days": 14,
  "notes": "הערות נוספות אם יש"
}

פרטי הזמנה:
${buildOrderSummary(order)}`;

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2000,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('AI לא החזיר JSON תקין');

  return JSON.parse(jsonMatch[0]) as AIRecommendation;
}

export async function generateCustomerMessage(
  order: OrderData,
  messageType: CustomerMessageType,
  trackingNumber?: string
): Promise<CustomerMessage> {
  const client = getClient();

  const typeLabels: Record<CustomerMessageType, string> = {
    order_received: 'אישור קבלת הזמנה',
    supplier_ordered: 'הזמנה בדרך — הוזמנה מהספק',
    tracking_received: `הזמנה נשלחה — מספר מעקב: ${trackingNumber || 'TRACK123'}`,
    delay: 'עיכוב בהזמנה',
    refund: 'עדכון על החזר כספי',
  };

  const prompt = `אתה כותב הודעות שירות לקוחות בעברית עבור CampIL — חנות ציוד קמפינג ישראלית.
כתוב הודעה ל: ${typeLabels[messageType]}

פרטי הזמנה:
- לקוח: ${order.customer_name}
- הזמנה: ${order.order_id}
- מוצרים: ${order.items_json.map((i) => `${i.quantity}× ${i.name}`).join(', ')}
- סה"כ: ₪${order.total}
${trackingNumber ? `- מספר מעקב: ${trackingNumber}` : ''}

צור שתי גרסאות:
1. הודעת WhatsApp (קצרה, חמה, לא פורמלית, עד 4 שורות, כולל אמוג'י מתאים)
2. אימייל (מקצועי יותר, כולל כותרת)

חזור **אך ורק** ב-JSON תקין:
{
  "whatsapp": "הטקסט להודעת WhatsApp",
  "email_subject": "כותרת האימייל",
  "email_body": "גוף האימייל"
}`;

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 800,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('AI לא החזיר JSON תקין');

  return JSON.parse(jsonMatch[0]) as CustomerMessage;
}
