import './globals.css';

import icon192 from '../assets/icons/icon-192.png';
import icon512 from '../assets/icons/icon-512.png';
import iconMaskable from '../assets/icons/icon-maskable.png';
import iconRound from '../assets/icons/icon-round.png';

export const metadata = {
  title: 'IUB Course Planner',
  description: 'Build conflict-free course plans from IRAS course offers.',
  applicationName: 'IUB Course Planner',
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
