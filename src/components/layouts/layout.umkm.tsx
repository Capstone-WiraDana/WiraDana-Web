'use client';
import { useEffect } from 'react';
import validateToken from '@/hooks/tokenValidation';
import { useRouter } from 'next/navigation';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';

const LayoutUmkm = ({
  title,
  children,
}: Readonly<{ title: string; children: React.ReactNode }>) => {
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const tokenData = await validateToken();
      if (tokenData) {
        const { role } = tokenData;
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
      <SidebarProvider>
        <AppSidebar />
        <main className='w-full'>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </>
  );
};

export default LayoutUmkm;
