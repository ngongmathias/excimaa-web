'use client';

import { ReactNode } from 'react';
import Head from 'next/head';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export function Layout({ 
  children, 
  title = 'EXCIMAA - Professional Accounting & Business Solutions',
  description = 'Expert accounting, auditing, and business consulting services to help your business grow and succeed.'
}: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      
      <main className="flex-grow pt-20">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}
