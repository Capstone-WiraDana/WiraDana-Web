'use client';

import { useEffect, useState } from 'react';
import Head from 'next/head';

const Daftar = () => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    document.title = 'WiraDana | Daftar';
  });

  return (
    <>
      <Head>
        <title>{document.title}</title>
      </Head>
      <div className='flex min-h-screen w-full items-center justify-center bg-emerald'>
        <form className='w-full px-40' action=''>
          <div
            className={`w-full bg-seasalt px-10 py-5 ${page === 1 ? '' : 'hidden'} rounded-[10px]`}
          >
            <p>test page 1</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                setPage(2);
              }}
            >
              Lanjut
            </button>
          </div>
          <div
            className={`w-full bg-seasalt px-10 py-5 ${page === 2 ? '' : 'hidden'} rounded-[10px]`}
          >
            <p>test page 2</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                setPage(1);
              }}
            >
              Kembali
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setPage(3);
              }}
            >
              Lanjut
            </button>
          </div>
          <div
            className={`w-full bg-seasalt px-10 py-5 ${page === 3 ? '' : 'hidden'} rounded-[10px]`}
          >
            <p>test page 3</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                setPage(2);
              }}
            >
              Kembali
            </button>
            <button
            type='submit'
            >
              Daftar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Daftar;
