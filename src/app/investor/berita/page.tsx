'use client';

import LayoutInv from '@/components/layouts/layout.investor';
import CardNews from '@/components/ui/card-news';
import { useState } from 'react';
import Link from 'next/link';

const Berita = () => {
  const [searchValue, setSearchValue] = useState('');

  const searchNews = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Search value:', searchValue);
  };

  return (
    <LayoutInv title='Berita UMKM'>
      <div className='flex w-full justify-center gap-10 px-5 py-12'>
        <div className='flex w-[50%] flex-col gap-12'>
          <CardNews
            story_id={1}
            umkm_id={1}
            logo='/img/test/logo.png'
            name='Amanah Karya'
            image_content='/img/test/content.png'
            likes={124}
            caption='Hari ini kami restock koleksi baju terbaru yang cocok untuk berbagai kesempatan, mulai dari jalan santai hingga acara spesial. Tidak hanya itu, kami juga live di TikTok untuk berbagi keseruan dan memberikan inspirasi gaya terbaik. '
            isLiked={true}
          />
        </div>
        <div className='flex w-[40%] flex-col gap-10'>
          <form action='' onSubmit={searchNews}>
            <div className='flex w-full gap-3'>
              <input
                className='h-10 w-[75%] rounded border border-blackolive ps-3'
                name='search'
                type='text'
                placeholder='Cari UMKM...'
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <input
                className='w-[25%] cursor-pointer rounded bg-emerald text-lg font-bold text-seasalt hover:bg-[#4cd298]'
                type='submit'
                value={'Cari Data'}
              />
            </div>
          </form>
          <div className='w-full rounded bg-emerald p-7 shadow-card'>
            <p className='text-center text-2xl font-bold text-seasalt'>
              Top UMKM paling Aktif
            </p>
            <div className='mt-3 flex w-full flex-col items-center gap-5'>
              <Link
                className='w-full'
                href={`/investor/profil-umkm/${'umkm_id'}`}
              >
                <div className='w-full rounded-xl bg-mintcream p-5'>
                  <div className='flex items-center'>
                    <img
                      className='w-20 rounded-[360px] border border-blackolive'
                      src='/img/test/logo.png'
                      alt='img_logo'
                    />
                    <div className='ms-5 w-full'>
                      <p className='text-2xl font-semibold text-blackolive'>
                        Amanah Karya
                      </p>
                      <p className='text-lg font-medium text-blackolive'>
                        Fashion & Tekstil
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </LayoutInv>
  );
};

export default Berita;
