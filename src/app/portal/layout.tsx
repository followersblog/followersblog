import type { Metadata } from 'next';

export const metadata: Metadata = {
  referrer: 'origin',
  title: 'Creator Portal | Next Level Creators',
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

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
