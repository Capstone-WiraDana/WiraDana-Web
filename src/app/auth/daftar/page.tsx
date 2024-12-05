'use client';

import { useEffect } from 'react';
import Head from 'next/head';

const Daftar = () => {
  useEffect(() => {
    document.title = 'WiraDana | Daftar';
  });
  return (
    <>
      <Head>
        <title>{document.title}</title>
      </Head>
      <h1>ini halaman daftar</h1>
    </>
  );
};

export default Daftar;
