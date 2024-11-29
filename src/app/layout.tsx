import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Poppins } from 'next/font/google';
import './globals.css';

const helveticaNeue = localFont({
  src: '../../public/fonts/HelveticaNeueRoman.otf',
  variable: '--font-helvetica-neue',
  weight: '400',
});

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: '400',
});

export const metadata: Metadata = {
  title: 'WiraDana',
  description: 'an Application to help UMKM',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${poppins.variable} ${helveticaNeue.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
