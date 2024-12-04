import React from 'react';

const Content: React.FC = () => {
  return (
    <>
      <div id='branding' className='w-full bg-mintcream px-6 py-16'>
        <div className='flex items-center'>
          <div className='w-1/2'>
            <p className='text-3xl font-medium leading-[3rem] text-blackolive'>
              <span className='text-4xl font-semibold text-emerald'>
                Sebagai Investor,
              </span>
              <br />
              Anda dapat dengan mudah memantau aktivitas UMKM, mulai dari
              aktivitas harian perkembangan usaha, hingga laporan keuangan
              mereka.
            </p>
          </div>
          <div className='flex w-1/2 items-center justify-center'>
            <img
              className='w-[500px]'
              src='/img/content/card-content.png'
              alt='img_content'
            />
          </div>
        </div>
        <div className='flex items-center'>
          <div className='flex w-1/2 items-center justify-center'>
            <img
              className='w-[400px]'
              src='/img/content/filter-content.png'
              alt='img_content'
            />
          </div>
          <div className='w-1/2'>
            <p className='text-3xl font-medium leading-[3rem] text-blackolive'>
              <span className='text-4xl font-semibold text-emerald'>
                Ingin mencari UMKM berdasarkan fokus bisnis?
              </span>
              <br />
              Di WiraDana, Anda dapat memfilter kategori bisnis UMKM sesuai
              fokus yang diinginkan, cepat, mudah, spesifik, dan praktis.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
