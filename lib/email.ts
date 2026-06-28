import nodemailer from 'nodemailer';

export interface OrderConfirmationEmailParams {
  to: string;
  customerName: string;
  orderId: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  subtotal: number;
  shipping: number;
  total: number;
  city: string;
  address: string;
}

export async function sendOrderConfirmationEmail(params: OrderConfirmationEmailParams) {
  const { to, customerName, orderId, items, subtotal, shipping, total, city, address } = params;
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    throw new Error('GMAIL_USER and GMAIL_APP_PASSWORD environment variables are not set.');
  }

  const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user, pass } });

  const itemRows = items
    .map(
      (i) => `
      <tr>
        <td style="padding:8px 0;font-size:14px;color:#111;border-bottom:1px solid #E4DDD2">${i.name}</td>
        <td style="padding:8px 0;font-size:14px;color:#555;border-bottom:1px solid #E4DDD2;text-align:center">×${i.quantity}</td>
        <td style="padding:8px 0;font-size:14px;color:#111;border-bottom:1px solid #E4DDD2;text-align:left">₪${(i.price * i.quantity).toLocaleString('he-IL')}</td>
      </tr>`
    )
    .join('');

  const html = `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F8F7F3;font-family:Arial,Helvetica,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F7F3;padding:32px 0">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;border:1px solid #E4DDD2;max-width:600px">
        <tr>
          <td style="background:#0F2E24;padding:28px 32px;text-align:center">
            <h1 style="margin:0;color:#fff;font-size:26px;letter-spacing:-0.5px">Camp<span style="color:#D8C8A8">IL</span></h1>
          </td>
        </tr>
        <tr>
          <td style="padding:32px">
            <p style="margin:0 0 8px;font-size:20px;font-weight:bold;color:#0F2E24">ההזמנה התקבלה! 🎉</p>
            <p style="margin:0 0 24px;font-size:15px;color:#444;line-height:1.6">שלום <strong>${customerName}</strong>, תודה על הרכישה. מספר ההזמנה שלך: <strong style="color:#0F2E24">${orderId}</strong></p>

            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px">
              ${itemRows}
            </table>

            <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F7F3;border:1px solid #E4DDD2;border-radius:12px;margin-bottom:24px">
              <tr><td style="padding:16px 20px">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-size:14px;color:#555;padding-bottom:6px">סכום ביניים</td>
                    <td style="font-size:14px;color:#111;text-align:left;padding-bottom:6px">₪${subtotal.toLocaleString('he-IL')}</td>
                  </tr>
                  <tr>
                    <td style="font-size:14px;color:#555;padding-bottom:6px">משלוח</td>
                    <td style="font-size:14px;color:#111;text-align:left;padding-bottom:6px">${shipping === 0 ? 'חינם' : `₪${shipping}`}</td>
                  </tr>
                  <tr>
                    <td style="font-size:15px;font-weight:bold;color:#0F2E24;padding-top:8px;border-top:1px solid #E4DDD2">סה"כ לתשלום</td>
                    <td style="font-size:15px;font-weight:bold;color:#0F2E24;text-align:left;padding-top:8px;border-top:1px solid #E4DDD2">₪${total.toLocaleString('he-IL')}</td>
                  </tr>
                </table>
              </td></tr>
            </table>

            <p style="margin:0 0 4px;font-size:14px;color:#555">כתובת למשלוח: <strong>${address}, ${city}</strong></p>
            <p style="margin:16px 0 0;font-size:13px;color:#888;line-height:1.6">נשלח עדכון עם פרטי מעקב כשהמשלוח יצא. לכל שאלה, ניתן לפנות אלינו בתשובה לאימייל זה.</p>
          </td>
        </tr>
        <tr>
          <td style="background:#F8F7F3;padding:16px 32px;text-align:center;border-top:1px solid #E4DDD2">
            <p style="margin:0;font-size:12px;color:#888">CampIL &middot; ${user}</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`.trim();

  await transporter.sendMail({
    from: `"CampIL" <${user}>`,
    to,
    subject: `אישור הזמנה ${orderId} — CampIL`,
    html,
  });
}

export interface TrackingEmailParams {
  to: string;
  customerName: string;
  orderId: string;
  supplierName: string;
  trackingNumber: string;
}

export function isEmailConfigured() {
  return !!(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);
}

export async function sendTrackingEmail(params: TrackingEmailParams) {
  const { to, customerName, orderId, supplierName, trackingNumber } = params;
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    throw new Error('GMAIL_USER and GMAIL_APP_PASSWORD environment variables are not set.');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });

  const subject = `עדכון משלוח להזמנה ${orderId} — CampIL`;

  const html = `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F8F7F3;font-family:Arial,Helvetica,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F7F3;padding:32px 0">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;border:1px solid #E4DDD2;max-width:600px">

        <!-- Header -->
        <tr>
          <td style="background:#0F2E24;padding:28px 32px;text-align:center">
            <h1 style="margin:0;color:#fff;font-size:26px;letter-spacing:-0.5px">
              Camp<span style="color:#D8C8A8">IL</span>
            </h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px">
            <p style="margin:0 0 12px;font-size:16px;color:#111">שלום <strong>${customerName}</strong>,</p>
            <p style="margin:0 0 24px;font-size:15px;color:#444;line-height:1.6">
              ההזמנה שלך <strong style="color:#0F2E24">${orderId}</strong> בדרכה אליך!
            </p>

            <!-- Tracking card -->
            <table width="100%" cellpadding="0" cellspacing="0"
              style="background:#F8F7F3;border:1px solid #E4DDD2;border-radius:12px;margin-bottom:24px">
              <tr>
                <td style="padding:20px 24px">
                  <p style="margin:0 0 14px;font-size:11px;color:#888;font-weight:bold;text-transform:uppercase;letter-spacing:0.8px">
                    פרטי משלוח
                  </p>
                  <table cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td style="font-size:14px;color:#555;padding-bottom:8px">ספק</td>
                      <td style="font-size:14px;font-weight:bold;color:#111;padding-bottom:8px;text-align:left">${supplierName}</td>
                    </tr>
                    <tr>
                      <td style="font-size:14px;color:#555">מספר מעקב</td>
                      <td style="text-align:left">
                        <code style="background:#fff;padding:4px 10px;border-radius:6px;border:1px solid #E4DDD2;font-size:14px;color:#0F2E24;font-weight:bold">
                          ${trackingNumber}
                        </code>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <p style="margin:0 0 8px;font-size:14px;color:#555;line-height:1.6">
              משלוחים בדרך כלל מגיעים תוך 7–14 ימי עסקים.
            </p>
            <p style="margin:0;font-size:14px;color:#555;line-height:1.6">
              לכל שאלה, ניתן לפנות אלינו בתשובה לאימייל זה.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#F8F7F3;padding:16px 32px;text-align:center;border-top:1px solid #E4DDD2">
            <p style="margin:0;font-size:12px;color:#888">CampIL &middot; ${user}</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
  `.trim();

  await transporter.sendMail({
    from: `"CampIL" <${user}>`,
    to,
    subject,
    html,
  });
}
