'use client';
import Head from 'next/head';
import { useEffect } from 'react';
import NavbarInv from '../navbar.inv';

const LayoutInv = ({
  children,
  title,
}: Readonly<{ children: React.ReactNode; title: string }>) => {
  useEffect(() => {
    document.title = `WiraDana | ${title}`;
  });

  return (
    <>
      <Head>
        <title>{document.title}</title>
      </Head>
      <div className='mb-20'>
        <NavbarInv />
      </div>
      {children}
    </>
  );
};

export default LayoutInv;
