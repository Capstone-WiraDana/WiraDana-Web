'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface CountData {
  dataUmkm: number;
  dataFund: number;
  dataInv: number;
}

const HeaderInv: React.FC = () => {
  const [countData, setCountData] = useState<CountData | null>(null);

  useEffect(() => {
    const fetchCountData = async () => {
      const fetchData = await fetch('/api/card-data', {
        method: 'GET',
      });

      if (fetchData.ok) {
        const data: CountData = await fetchData.json();
        setCountData(data); // Simpan data ke dalam state
      }
    };

    fetchCountData();
  }, []);

  return (
    <>
      <div className='w-full px-6 py-10' id='header'>
        <div className='flex items-center justify-center'>
          <div className='w-1/2'>
            <p className='text-6xl font-bold text-emerald'>WiraDana</p>
            <p className='text-4xl font-semibold text-erie'>
              Hubungkan UMKM Anda dengan Investor Potensial – Bangun Kesuksesan
              Bersama di WiraDana!
            </p>
            <p className='mt-2 text-2xl text-blackolive'>
              Bersama WiraDana, bangun kemitraan strategis untuk mendukung
              pertumbuhan usaha dan raih kesuksesan berkelanjutan.
            </p>
            <Link href={'/investor/cari-umkm'}>
              <button className='mt-4 bg-emerald px-8 py-3 text-3xl font-bold text-mintcream hover:bg-[#4cd298]'>
                Cari UMKM
              </button>
            </Link>
          </div>
          <div className='w-1/2'>
            <img
              className='w-full'
              src='/img/content/header-img.png'
              alt='header_img'
            />
          </div>
        </div>
      </div>
      <div className='flex items-center justify-center gap-16'>
        <div className='flex items-center justify-center rounded-lg bg-celadon px-8 py-5 shadow-card'>
          <div className='w-20'>
            <img src='/img/icons/umkm.png' alt='card1_img' />
          </div>
          <div className='ms-3'>
            <p className='text-xl font-medium text-blackolive'>UMKM Aktif</p>
            <p className='text-4xl font-bold text-erie'>
              {countData != null ? String(countData.dataUmkm) : 'Loading...'}{' '}
              UMKM
            </p>
          </div>
        </div>
        <div className='mb-20 flex items-center justify-center rounded-lg bg-emerald px-8 py-5 shadow-card'>
          <div className='w-20'>
            <img src='/img/icons/done.png' alt='card1_img' />
          </div>
          <div className='ms-3'>
            <p className='text-xl font-medium text-mintcream'>
              UMKM yang terbantu
            </p>
            <p className='text-4xl font-bold text-seasalt'>
              {countData != null ? String(countData.dataFund) : 'Loading...'}{' '}
              UMKM
            </p>
          </div>
        </div>
        <div className='flex items-center justify-center rounded-lg bg-celadon px-8 py-5 shadow-card'>
          <div className='w-20'>
            <img src='/img/icons/investor.png' alt='card1_img' />
          </div>
          <div className='ms-3'>
            <p className='text-xl font-medium text-blackolive'>
              Investor Aktif
            </p>
            <p className='text-4xl font-bold text-erie'>
              {countData != null ? String(countData.dataInv) : 'Loading...'}{' '}
              Investor
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderInv;
