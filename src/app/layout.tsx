import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import MetaPixel from '@/components/MetaPixel';

export const metadata: Metadata = {
  title: 'Followers.blog — Learn AI Website Building & Digital Skills',
  description: 'Learn practical AI website building and explore digital services at Followers.blog.',
  keywords: ['AI website building', 'practical coding workshop', 'learn web development', 'Followers.blog', 'digital skills'],
  authors: [{ name: 'Followers.blog' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://followers.blog'),
  openGraph: {
    title: 'Followers.blog — Learn AI Website Building & Digital Skills',
    description: 'AI Se Professional Website Banana Seekho — Sirf 3 Ghante Mein. Zero to live website workflow.',
    url: 'https://followers.blog',
    siteName: 'Followers.blog',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Followers.blog — Learn AI Website Building & Digital Skills',
    description: '3-hour practical live workshop to build modern websites with AI.',
  },
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/icon.png',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://api.razorpay.com" />
        <link rel="dns-prefetch" href="https://api.razorpay.com" />
        <link rel="preconnect" href="https://checkout.razorpay.com" />
        <link rel="dns-prefetch" href="https://checkout.razorpay.com" />
      </head>
      <body className="min-h-screen bg-white text-zinc-900 flex flex-col antialiased selection:bg-blue-100 selection:text-blue-900">
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
