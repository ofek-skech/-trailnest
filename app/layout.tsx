import type { Metadata, Viewport } from 'next';
import { Rubik, Nunito_Sans } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/cart-context';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

const rubik = Rubik({
  variable: '--font-rubik',
  subsets: ['latin', 'hebrew'],
  weight: ['400','500','600','700','800','900'],
  display: 'swap',
});
const nunitoSans = Nunito_Sans({
  variable: '--font-nunito-sans',
  subsets: ['latin'],
  weight: ['300','400','500','600','700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: { default: 'CampIL — הציוד שאתם באמת צריכים לשטח', template: '%s | CampIL' },
  description: 'ציוד קמפינג, אוברלנדינג וטיולי 4X4 שנבחר על ידי אנשים שחיים את השטח. מטבחי שטח, תאורה, ציוד רכב, שינה ועוד — משלוח מהיר לכל הארץ.',
  keywords: ['ציוד קמפינג','אוברלנדינג','4x4','ציוד שטח','campil','camping israel','overlanding israel'],
  openGraph: {
    title: 'CampIL — הציוד שאתם באמת צריכים לשטח',
    description: 'ציוד קמפינג, אוברלנדינג וטיולי 4X4 שנבחר על ידי אנשים שחיים את השטח.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1F4D3A',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${rubik.variable} ${nunitoSans.variable} h-full`}>
      <body className="min-h-dvh flex flex-col antialiased bg-white text-[#111111]">
        <CartProvider>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[200] px-4 py-2 bg-tn-600 text-white rounded-lg text-sm font-semibold">
            דלג לתוכן הראשי
          </a>
          <Navigation />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
