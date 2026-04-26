import './globals.css';

export const metadata = {
  title: 'IUB Course Planner',
  description: 'Build conflict-free course plans from IRAS course offers.',
  applicationName: 'IUB Course Planner'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
