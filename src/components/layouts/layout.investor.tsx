'use client';
import Head from 'next/head';
import { useEffect } from 'react';
import NavbarInv from '../navbar.inv';
import validateToken from '@/hooks/tokenValidation';
import { useRouter } from 'next/navigation';

const LayoutInv = ({
  children,
  title,
}: Readonly<{ children: React.ReactNode; title: string }>) => {
  const router = useRouter();

  useEffect(() => {
    document.title = `WiraDana | ${title}`;

    const checkToken = async () => {
      const tokenData = await validateToken();
      if (tokenData) {
        const { role } = tokenData;
        if (role != 'investor' && role == 'umkm') {
          router.push('/umkm');
        } else if (role != 'investor' && role != 'umkm') {
          router.push('/');
        }
      } else {
        router.push('/');
      }
    };

    checkToken();
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
