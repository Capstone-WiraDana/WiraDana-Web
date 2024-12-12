'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface NavbarInvProps {
  id: number;
}

interface User {
  username: string;
  photo_url: string;
  user_id: number;
}

const NavbarInv: React.FC<NavbarInvProps> = ({ id }) => {
  const currentPath = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [idUs, setId] = useState<number | undefined>(undefined);

  const urls = [
    { name: 'Beranda', path: '/investor' },
    { name: 'Cari UMKM', path: '/investor/cari-umkm' },
    { name: 'Berita UMKM', path: '/investor/berita' },
  ];

  useEffect(() => {
    if (id) {
      setId(id);
    }
  }, [id]);

  useEffect(() => {
    if (idUs !== undefined) {
      const getDataUser = async () => {
        const getData = await fetch(`/api/nav-data?id=${idUs}`, {
          method: 'GET',
        });
        if (getData.ok) {
          const data = await getData.json();
          setUser(data.data);
        }
      };

      getDataUser();
    }
  }, [idUs]);

  console.log(user);

  const logoutHandler = async () => {
    window.localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <nav className='fixed top-0 flex w-full scroll-smooth bg-emerald px-10 py-5'>
      <div className='flex w-auto items-center'>
        <Link href={'/investor'}>
          <p className='text-3xl font-bold text-seasalt'>WiraDana</p>
        </Link>
      </div>
      <div className='flex w-full items-center justify-end gap-8'>
        {urls.map((url, index) => (
          <Link key={index} href={url.path}>
            <p
              className={`text-xl text-seasalt ${url.path === currentPath ? 'font-semibold' : 'font-normal'} hover:font-semibold`}
            >
              {url.name}
            </p>
          </Link>
        ))}
        <div className='w-6'>
          <img
            className='cursor-pointer'
            src='/img/icons/notification.png'
            alt='img_notification'
          />
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              {user != null ? (
                <img
                  className='h-12 w-12 cursor-pointer rounded-[360px] border-2 border-seasalt object-cover'
                  src={user.photo_url}
                  alt='img_user'
                />
              ) : (
                <></>
              )}
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {user != null ? (
                    <>{user.username}</>
                  ) : (
                    <>
                      <p className='from-neutral-400 font-light'>loading...</p>
                    </>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={`/investor/profil/${user?.user_id}`}>
                  <DropdownMenuItem className='cursor-pointer font-semibold'>
                    Profil
                  </DropdownMenuItem>
                </Link>
                <Link href={'/investor/portofolio'}>
                  <DropdownMenuItem className='cursor-pointer font-semibold'>
                    Portofolio
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className='cursor-pointer font-semibold text-red-500 hover:!text-red-500'
                  onClick={logoutHandler}
                >
                  Keluar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuTrigger>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default NavbarInv;
