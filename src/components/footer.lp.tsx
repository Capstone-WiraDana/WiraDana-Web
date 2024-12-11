import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <>
      <div className='w-full bg-blackolive p-5'>
        <p className='text-3xl font-bold text-emerald'>WiraDana</p>
        <div className='mt-3 flex w-full justify-between'>
          <div className=''>
            <p className='text-lg text-seasalt'>WiraDana@gmail.com</p>
            <p className='text-lg text-seasalt'>+6281287444211</p>
            <p className='text-lg text-seasalt'>Jakarta, Indonesia</p>
          </div>
          <div className='flex flex-col'>
            <a
              className='text-lg text-seasalt hover:text-[#d1cfcf]'
              href='#branding'
            >
              Kemudahan WiraDana
            </a>
            <a
              className='text-lg text-seasalt hover:text-[#d1cfcf]'
              href='#about'
            >
              Tentang WiraDana
            </a>
            <a
              className='text-lg text-seasalt hover:text-[#d1cfcf]'
              href='#about2'
            >
              Kenapa Memilih WiraDana?
            </a>
          </div>
          <div>
            <Link href={'/auth/daftar?role=investor'}>
              <p className='text-lg text-seasalt hover:text-[#d1cfcf]'>
                Daftar Menjadi Investor
              </p>
            </Link>
            <Link href={'/auth/daftar?role=umkm'}>
              <p className='text-lg text-seasalt hover:text-[#d1cfcf]'>
                Daftar Menjadi Pemilik UMKM
              </p>
            </Link>
            <Link href={'/auth/masuk'}>
              <p className='text-lg text-seasalt hover:text-[#d1cfcf]'>
                Jelajahi WiraDana
              </p>
            </Link>
          </div>
          <div>
            <p className='text-xl font-semibold text-seasalt'>Ikuti kami</p>
            <div className='mt-1 flex justify-center gap-5'>
              <Link href={'https://instagram.com'} target='_blank'>
                <img className='w-10' src='/img/icons/ig.png' alt='' />
              </Link>
              <Link href={'https://x.com'} target='_blank'>
                <img className='w-10' src='/img/icons/x.png' alt='' />
              </Link>
              <Link href={'https://linkedin.com'} target='_blank'>
                <img className='w-10' src='/img/icons/linkedin.png' alt='' />
              </Link>
            </div>
          </div>
        </div>
        <p className='mt-7 text-center text-xl font-medium text-seasalt'>
          © 2024 WiraDana. All rights reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
