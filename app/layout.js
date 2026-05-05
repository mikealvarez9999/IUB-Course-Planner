import './globals.css';

import icon192 from '../assets/icons/icon-192.png';
import icon512 from '../assets/icons/icon-512.png';
import iconMaskable from '../assets/icons/icon-maskable.png';
import iconRound from '../assets/icons/icon-round.png';

export const metadata = {
  title: 'IUB Course Planner',
  description: 'Build conflict‑free course plans from IRAS course offers. Fast, mobile‑friendly, and option to export your plan as JPG.',
  applicationName: 'IUB Course Planner',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'IUB Course Planner',
    description: 'Build conflict‑free course plans from IRAS course offers. Fast, mobile‑friendly, and option to export your plan as JPG.',
    url: '/',
    siteName: 'IUB Course Planner',
    type: 'website',
    images: [
      {
        url: '/social/og-image-1200x630.jpg',
        width: 1200,
        height: 630,
        alt: 'IUB Course Planner preview image'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IUB Course Planner',
    description: 'Build conflict‑free course plans from IRAS course offers. Fast, mobile‑friendly, and option to export your plan as JPG.',
    images: ['/social/og-image-1200x630.jpg']
  },
  icons: {
    icon: [
      { url: icon192.src, type: 'image/png', sizes: '192x192' },
      { url: icon512.src, type: 'image/png', sizes: '512x512' }
    ],
    apple: [
      { url: icon192.src, type: 'image/png', sizes: '192x192' }
    ],
    shortcut: [
      { url: iconRound.src, type: 'image/png', sizes: '192x192' }
    ],
    other: [
      { rel: 'mask-icon', url: iconMaskable.src, color: '#121821' }
    ]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
