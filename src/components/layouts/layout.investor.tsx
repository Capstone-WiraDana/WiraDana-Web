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
  const router = useRouter()

  useEffect(() => {
    document.title = `WiraDana | ${title}`;

    const validateUser = async () => {
      const getToken = await validateToken()
      if(getToken) {
        const { role } = getToken
        if(role !== "investor") {
          router.push("/umkm")
        }
      } else {
        router.push("/")
      }
    }

    validateUser()
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
