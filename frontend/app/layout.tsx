import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'THREAD.AI - AI Fashion Discovery Platform',
  description: 'Discover, create, and share AI-powered fashion designs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
