import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className='fixed top-0 flex w-full scroll-smooth bg-emerald px-6 py-5'>
      <div className='flex w-auto items-center'>
        <Link href={'/'}>
          <p className='text-h5 font-bold text-seasalt'>WiraDana</p>
        </Link>
      </div>
      <div className='flex w-full items-center justify-end'>
        <a
          className='me-8 text-body-1 text-seasalt hover:font-semibold'
          href='#header'
        >
          Beranda
        </a>
        <a
          className='me-10 text-body-1 text-seasalt hover:font-semibold'
          href='#about'
        >
          Tentang Kami
        </a>
        <Link href={'/auth/daftar'} className='me-5'>
          <p className='rounded-sm bg-mintcream px-6 py-2 text-body-1 font-bold text-emerald hover:bg-[#d0f3e4]'>
            Daftar
          </p>
        </Link>
        <Link href={'/auth/masuk'}>
          <p className='rounded-sm border-2 border-mintcream bg-emerald px-6 py-2 text-body-1 font-bold text-mintcream hover:bg-[#4cd298]'>
            Masuk
          </p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
