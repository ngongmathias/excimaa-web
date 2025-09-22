import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ClientLayout from './client-layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EXCIMAA - Professional Accounting & Business Solutions',
  description: 'Expert accounting, auditing, and business consulting services to help your business grow and succeed.',
  keywords: 'accounting, business consulting, tax services, financial advisory, audit services',
  authors: [{ name: 'EXCIMAA Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://excimaa.com',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClientLayout>
      {children}
    </ClientLayout>
  );
}
