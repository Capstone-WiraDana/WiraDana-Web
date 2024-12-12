'use client';
import LayoutInv from '@/components/layouts/layout.investor';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import CardUmkm from '@/components/ui/card-umkm';
import { useEffect, useState } from 'react';

const CariUmkm = () => {
  const [fund, setFund] = useState<any[]>([]);

  useEffect(() => {
    const fetchDataFund = async () => {
      const fetchData = await fetch('/api/fund-data', {
        method: 'GET',
      });

      if (fetchData.ok) {
        const data = await fetchData.json();
        setFund(data.data);
      }
    };

    fetchDataFund();
  }, []);

  return (
    <>
      <LayoutInv title='Cari UMKM'>
        <div className='px-5 py-12'>
          <div className='flex justify-center gap-3 px-5'>
            <input
              className='h-10 w-[60%] rounded-md border border-blackolive ps-3'
              type='text'
              placeholder='Cari Data UMKM...'
            />
            <DropdownMenu>
              <DropdownMenuTrigger className='flex h-10 items-center justify-center gap-2 rounded-md bg-sunshine px-4'>
                <img
                  className='w-7 cursor-pointer'
                  src='/img/icons/location.png'
                  alt='img_location'
                />
                <p className='text-lg font-bold'>Lokasi</p>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Jakarta</DropdownMenuItem>
                <DropdownMenuItem>Bandung</DropdownMenuItem>
                <DropdownMenuItem>Jawa</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <input
              className='cursor-pointer rounded-md bg-emerald px-16 text-lg font-bold text-seasalt hover:bg-emeraldhover'
              type='submit'
              value={'Cari Data'}
            />
          </div>
          <div className='mt-8 flex w-full justify-center gap-5 px-2'>
            <form className='h-fit w-[40%] rounded border border-blackolive bg-white p-5'>
              <p className='text-xl font-medium text-erie'>Data UMKM</p>
              <div className='my-2 border-[1px] border-t border-black'></div>
              <div className='flex w-full flex-wrap font-medium'>
                <label className='inline-flex items-center' htmlFor=''>
                  <input
                    className='h-4 w-4 cursor-pointer rounded border-gray-300'
                    type='checkbox'
                  />
                  <span className='ms-2'>Rekomendasi UMKM</span>
                </label>
                <label className='ms-5 inline-flex items-center' htmlFor=''>
                  <input
                    className='h-4 w-4 cursor-pointer rounded border-gray-300'
                    type='checkbox'
                  />
                  <span className='ms-2'>UMKM Paling Membutuhkan</span>
                </label>
                <label className='inline-flex items-center' htmlFor=''>
                  <input
                    className='h-4 w-4 cursor-pointer rounded border-gray-300'
                    type='checkbox'
                  />
                  <span className='ms-2'>UMKM Sekitar Anda</span>
                </label>
              </div>
              <p className='pt-3 text-xl font-medium text-erie'>Skala Usaha</p>
              <div className='my-2 border-[1px] border-t border-black'></div>
              <div className='flex w-full gap-5 font-medium'>
                <label className='inline-flex items-center' htmlFor=''>
                  <input
                    className='h-4 w-4 cursor-pointer rounded border-gray-300'
                    type='checkbox'
                  />
                  <span className='ms-2'>Mikro</span>
                </label>
                <label className='inline-flex items-center' htmlFor=''>
                  <input
                    className='h-4 w-4 cursor-pointer rounded border-gray-300'
                    type='checkbox'
                  />
                  <span className='ms-2'>Kecil</span>
                </label>
                <label className='inline-flex items-center' htmlFor=''>
                  <input
                    className='h-4 w-4 cursor-pointer rounded border-gray-300'
                    type='checkbox'
                  />
                  <span className='ms-2'>Menengah</span>
                </label>
              </div>
              <p className='pt-3 text-xl font-medium text-erie'>Jenis Usaha</p>
              <div className='my-2 border-[1px] border-t border-black'></div>
              <div className='flex w-full flex-wrap font-medium'>
                <label className='inline-flex items-center' htmlFor=''>
                  <input
                    className='h-4 w-4 cursor-pointer rounded border-gray-300'
                    type='checkbox'
                  />
                  <span className='ms-2'>Kuliner dan Makanan</span>
                </label>
                <label className='inline-flex items-center' htmlFor=''>
                  <input
                    className='ms-5 h-4 w-4 cursor-pointer rounded border-gray-300'
                    type='checkbox'
                  />
                  <span className='ms-2'>Fashion dan Tekstil</span>
                </label>
                <label className='inline-flex items-center' htmlFor=''>
                  <input
                    className='h-4 w-4 cursor-pointer rounded border-gray-300'
                    type='checkbox'
                  />
                  <span className='ms-2'>Agribisnis</span>
                </label>
                <label className='ms-5 inline-flex items-center' htmlFor=''>
                  <input
                    className='h-4 w-4 cursor-pointer rounded border-gray-300'
                    type='checkbox'
                  />
                  <span className='ms-2'>Kerajinan Tangan</span>
                </label>
                <label className='ms-5 inline-flex items-center' htmlFor=''>
                  <input
                    className='h-4 w-4 cursor-pointer rounded border-gray-300'
                    type='checkbox'
                  />
                  <span className='ms-2'>Teknologi Digital</span>
                </label>
                <label className='inline-flex items-center' htmlFor=''>
                  <input
                    className='h-4 w-4 cursor-pointer rounded border-gray-300'
                    type='checkbox'
                  />
                  <span className='ms-2'>Kesehatan dan Kecantikan</span>
                </label>
                <label className='ms-5 inline-flex items-center' htmlFor=''>
                  <input
                    className='h-4 w-4 cursor-pointer rounded border-gray-300'
                    type='checkbox'
                  />
                  <span className='ms-2'>Pendidikan & Pelatihan</span>
                </label>
                <label className='inline-flex items-center' htmlFor=''>
                  <input
                    className='h-4 w-4 cursor-pointer rounded border-gray-300'
                    type='checkbox'
                  />
                  <span className='ms-2'>Otomotif & Transportasi</span>
                </label>
                <label className='ms-5 inline-flex items-center' htmlFor=''>
                  <input
                    className='h-4 w-4 cursor-pointer rounded border-gray-300'
                    type='checkbox'
                  />
                  <span className='ms-2'>Perdagangan Umum</span>
                </label>
                <label className='inline-flex items-center' htmlFor=''>
                  <input
                    className='h-4 w-4 cursor-pointer rounded border-gray-300'
                    type='checkbox'
                  />
                  <span className='ms-2'>Pariwisata</span>
                </label>
              </div>
              <p className='pt-3 text-xl font-medium text-erie'>
                Durasi Berdiri Usaha
              </p>
              <div className='my-2 border-[1px] border-t border-black'></div>
              <div className='flex w-full gap-5 font-medium'>
                <label className='inline-flex items-center' htmlFor=''>
                  <input
                    className='h-4 w-4 cursor-pointer rounded border-gray-300'
                    type='checkbox'
                  />
                  <span className='ms-2'>0–2 Tahun</span>
                </label>
                <label className='inline-flex items-center' htmlFor=''>
                  <input
                    className='h-4 w-4 cursor-pointer rounded border-gray-300'
                    type='checkbox'
                  />
                  <span className='ms-2'>3–5 Tahun</span>
                </label>
                <label className='inline-flex items-center' htmlFor=''>
                  <input
                    className='h-4 w-4 cursor-pointer rounded border-gray-300'
                    type='checkbox'
                  />
                  <span className='ms-2'>Lebih dari 5 Tahun</span>
                </label>
              </div>
              <input
                className='mt-3 h-10 w-full cursor-pointer rounded bg-bluesky text-xl font-bold text-white hover:bg-blueskyhover'
                type='submit'
                value={'Filter'}
              />
            </form>
            <div className='w-[60%]'>
              <div className='flex w-full flex-wrap gap-5'>
                {fund.length > 0 ? (
                  fund.map((data, index) => (
                    <CardUmkm
                      key={index}
                      id={data.fundraising_id}
                      umkm_name={data.umkm_name}
                      image_url={data.photo_url}
                      umkm_type={data.business_type}
                      umkm_place={data.location}
                      umkm_year={data.founded_year}
                    />
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </LayoutInv>
    </>
  );
};

export default CariUmkm;
