import './globals.css';
import Script from 'next/script';

export const metadata = {
  title: 'IUB Course Planner',
  description: 'Build conflict‑free course plans from IRAS course offers. Fast, mobile‑friendly, and option to export your plan as JPG.',
  applicationName: 'IUB Course Planner',
  robots: {
    index: true,
    follow: true
  },
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
      { url: '/logos/favicon_io/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/logos/favicon_io/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/logos/favicon_io/android-chrome-192x192.png', type: 'image/png', sizes: '192x192' },
      { url: '/logos/favicon_io/android-chrome-512x512.png', type: 'image/png', sizes: '512x512' }
    ],
    apple: [
      { url: '/logos/favicon_io/apple-touch-icon.png', type: 'image/png', sizes: '192x192' }
    ],
    shortcut: '/logos/favicon_io/favicon.ico',
    other: [
      { rel: 'mask-icon', url: '/logos/favicon_io/favicon-32x32.png', color: '#121821' },
      { rel: 'manifest', url: '/logos/favicon_io/site.webmanifest' }
    ]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);} 
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { page_path: window.location.pathname });
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
