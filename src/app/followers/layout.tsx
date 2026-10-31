import type { Metadata } from 'next';

export const metadata: Metadata = {
  referrer: 'origin',
  title: 'Media Consultation & Growth Portal | Followers.blog',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function FollowersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* High-speed CDN & Gateway Preconnect for instant checkout initiation */}
      <link rel="preconnect" href="https://sdk.cashfree.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://sdk.cashfree.com" />
      <link rel="preconnect" href="https://api.cashfree.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://api.cashfree.com" />
      {children}
    </>
  );
}
