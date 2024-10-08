import './globals.css';
import type { Metadata } from 'next';

import { Header } from '@/components/Header';

export const metadata: Metadata = {
  title: 'Job searcher',
  description: 'Find your perfect job!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='relative'>
          <Header />
          {children}
      </body>
    </html>
  );
}
