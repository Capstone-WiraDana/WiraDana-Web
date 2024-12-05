'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';

const Masuk = () => {
  const router = useRouter();

  useEffect(() => {
    document.title = 'WiraDana | Masuk';
  });

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement)
      .value;

    router.push('/investor');
  };

  return (
    <>
      <Head>
        <title>{document.title}</title>
      </Head>
      <div className='flex h-screen w-full items-center justify-center bg-emerald px-52'>
        <div className='w-full rounded-[10px] bg-seasalt px-10 py-5'>
          <p className='text-center text-5xl font-bold text-blackolive'>
            Masuk
          </p>
          <form className='my-5' action='' onSubmit={onSubmit}>
            <p className='text-3xl font-medium text-blackolive'>Email</p>
            <input
              className='mt-2 h-10 w-full rounded-[5px] border-[1.3px] border-erie ps-2'
              name='email'
              type='email'
              placeholder='johnDoe@gmail.com'
              required
            />
            <p className='mt-5 text-3xl font-medium text-blackolive'>
              Password
            </p>
            <input
              className='mt-2 h-10 w-full rounded-[5px] border-[1.3px] border-erie ps-2'
              name='password'
              type='password'
              placeholder='Masukkan Password Anda...'
              required
            />
            <div className='mt-10 flex flex-col items-center justify-center'>
              <input
                className='cursor-pointer rounded-[5px] bg-[#0D92F4] px-52 py-3 text-3xl font-bold text-seasalt hover:bg-[#3daaf8]'
                type='submit'
                value={'Masuk'}
              />
              <Link href={'/auth/daftar'}>
                <p className='mt-2 text-lg underline'>
                  Belum Punya Akun? Daftar
                </p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Masuk;
