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
  return <>{children}</>;
}
