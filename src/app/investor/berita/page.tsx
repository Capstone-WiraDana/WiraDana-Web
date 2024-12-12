'use client';

import LayoutInv from '@/components/layouts/layout.investor';
import CardNews from '@/components/ui/card-news';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import validateToken from '@/hooks/tokenValidation';
import { Skeleton } from '@/components/ui/skeleton';
import convertAbbreviation from '@/hooks/use-convertAbr';

const Berita = () => {
  const [searchValue, setSearchValue] = useState('');
  const [id, setId] = useState<number>();
  const [news, setNews] = useState<any[]>([]);
  const [umkm, setUmkm] = useState<any[]>([]);

  useEffect(() => {
    const getId = async () => {
      const token = await validateToken();
      if (token) {
        const { id } = token;
        setId(id);
      }
    };

    const fetchDataNews = async () => {
      if (!id) return;
      const fetchNews = await fetch(`/api/news?id=${id}`, {
        method: 'GET',
      });

      if (fetchNews.ok) {
        const response = await fetchNews.json();
        setNews(response.data);
      } else {
        console.error('Failed to fetch news:', fetchNews.statusText);
      }
    };

    const fetchTopUmkm = async () => {
      const fetchUmkm = await fetch('/api/top-umkm', {
        method: 'GET',
      });

      if (fetchUmkm.ok) {
        const response = await fetchUmkm.json();
        setUmkm(response.data);
      }
    };

    getId().then(() => fetchDataNews());
    fetchTopUmkm();
  }, [id]);

  const searchNews = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <LayoutInv title='Berita UMKM'>
      <div className='flex w-full justify-center gap-10 px-5 py-12'>
        <div className='flex w-[50%] flex-col gap-12'>
          {news.length > 0 ? (
            news.map((item, index) => (
              <CardNews
                key={index}
                user_id={Number(id)}
                story_id={item.story_id}
                umkm_id={item.umkm_id}
                logo={item.logo_url}
                name={item.umkm_name}
                image_content={item.photo_url}
                likes={item.likes_count}
                comments={item.comments_count}
                caption={item.caption}
                isLiked={item.isliked}
              />
            ))
          ) : (
            <div className='flex w-full flex-col space-y-3'>
              <Skeleton className='h-[70vh] w-full rounded-xl' />
              <div className='space-y-2'>
                <Skeleton className='h-4 w-[35%]' />
                <Skeleton className='h-4 w-[80%]' />
              </div>
            </div>
          )}
        </div>
        <div className='flex w-[40%] flex-col gap-10'>
          <form onSubmit={searchNews}>
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
                value='Cari Data'
              />
            </div>
          </form>
          <div className='w-full rounded bg-emerald p-7 shadow-card'>
            <p className='text-center text-2xl font-bold text-seasalt'>
              Top UMKM paling Aktif
            </p>
            <div className='mt-3 flex w-full flex-col items-center gap-5'>
              {umkm?.length > 0 ? (
                umkm.map((data, index) => (
                  <div key={index} className='w-full'>
                    <Link
                      className='w-full'
                      href={`/investor/profil-umkm/${data.user_id}`}
                    >
                      <div className='w-full rounded-xl bg-mintcream p-5'>
                        <div className='flex items-center'>
                          <img
                            className='w-20 rounded-[360px] border border-blackolive'
                            src={data.logo_url}
                            alt='img_logo'
                          />
                          <div className='ms-5 w-full'>
                            <p className='text-2xl font-semibold text-blackolive'>
                              {data.umkm_name}
                            </p>
                            <p className='text-lg font-medium text-blackolive'>
                              {convertAbbreviation(data.business_type)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div className='w-full'>
                  <Skeleton className='h-[20vh] w-full rounded-xl' />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </LayoutInv>
  );
};

export default Berita;
