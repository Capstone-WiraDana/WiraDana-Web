'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import validateToken from '@/hooks/tokenValidation';

export default function AuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const check = await validateToken();
      if (check) {
        const { role } = check;
        if (role === 'investor') {
          router.push('/investor');
        } else if (role === 'umkm') {
          router.push('/umkm');
        } else {
          router.push('/');
        }
      } else {
        router.push('/');
      }
    };

    checkToken();
  }, [router]);

  return null;
}
 