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

const NavbarInv: React.FC = () => {
  const currentPath = usePathname();

  const urls = [
    { name: 'Beranda', path: '/investor' },
    { name: 'Cari UMKM', path: '/investor/cari-umkm' },
    { name: 'Berita UMKM', path: '/investor/berita' },
  ];

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
              <img
                className='h-12 w-12 cursor-pointer rounded-[360px] border-2 border-seasalt object-cover'
                src='https://img.freepik.com/premium-photo/smiling-young-asian-man-showing-copy-space-palm-holding-another-hand-waist-isolated_1006674-617.jpg'
                alt='img_user'
              />
              <DropdownMenuContent>
                <DropdownMenuLabel>John Doe</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={''}>
                  <DropdownMenuItem className='cursor-pointer font-semibold'>
                    Profil
                  </DropdownMenuItem>
                </Link>
                <Link href={''}>
                  <DropdownMenuItem className='cursor-pointer font-semibold'>
                    Portofolio
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='cursor-pointer font-semibold text-red-500 hover:!text-red-500'>
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
