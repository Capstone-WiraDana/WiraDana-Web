'use client';
import Head from 'next/head';
import { useEffect } from 'react';
import validateToken from '@/hooks/tokenValidation';
import { useRouter } from 'next/navigation';

const LayoutUmkm = ({
  title,
  children,
}: Readonly<{ title: string; children: React.ReactNode }>) => {
  const router = useRouter();

  useEffect(() => {
    document.title = `WiraDana | ${title}`;

    const checkToken = async () => {
      const tokenData = await validateToken();
      if (tokenData) {
        const { id, role } = tokenData;
        if (role != 'umkm' && role == 'investor') {
          router.push('/investor');
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
      {children}
    </>
  );
};

export default LayoutUmkm
