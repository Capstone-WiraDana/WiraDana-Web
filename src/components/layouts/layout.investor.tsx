'use client';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import NavbarInv from '../navbar.inv';
import validateToken from '@/hooks/tokenValidation';
import { useRouter } from 'next/navigation';

const LayoutInv = ({
  children,
  title,
}: Readonly<{ children: React.ReactNode; title: string }>) => {
  const router = useRouter();
  const [id, setId] = useState<number>();

  useEffect(() => {
    const checkToken = async () => {
      const tokenData = await validateToken();
      if (tokenData) {
        const { id, role } = tokenData;
        setId(id);
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
        <title>WiraDana | ${title}</title>
      </Head>
      <div className='mb-20'>
        <NavbarInv id={Number(id)} />
      </div>
      {children}
    </>
  );
};

export default LayoutInv;
