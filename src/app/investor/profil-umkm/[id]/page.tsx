'use client';
import LayoutInv from '@/components/layouts/layout.investor';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  LucideCalendarSync,
  LucideBriefcaseBusiness,
  Building,
  UsersRound,
  MapPin,
} from 'lucide-react';
import formatNumber from '@/hooks/use-format';
import convertAbbreviation from '@/hooks/use-convertAbr';
import { Skeleton } from '@/components/ui/skeleton';

const ProfilUmkm = () => {
  const router = useRouter();
  const params = useParams();

  const [profile, setProfile] = useState<any | undefined>('');
  const [fund, setFund] = useState<any[]>([]);

  const id = params.id;

  useEffect(() => {
    const fethDataFund = async () => {
      const fetchFund = await fetch(`/api/profile-fund/${id}`, {
        method: 'GET',
      });

      const fetchDataProfile = await fetch(`/api/profile/umkm/${id}`, {
        method: 'GET',
      });

      if (fetchFund.ok && fetchDataProfile.ok) {
        const data = await fetchFund.json();
        const dataP = await fetchDataProfile.json();
        setFund(data.fundData);
        setProfile(dataP.data);
      }
    };

    if (id) {
      fethDataFund();
    }
  }, [id]);

  console.log(profile);

  console.log(fund);
  return (
    <LayoutInv title='Profil UMKM'>
      <div className='h-auto w-full px-10 py-12'>
        <button
          className='rounded bg-red-500 px-8 py-2 text-xl font-bold text-seasalt hover:bg-red-400'
          onClick={() => router.back()}
        >
          Kembali
        </button>
        {profile != null ? (
          <>
            <div className='mt-10 flex w-full items-center'>
              <img
                className='w-[10rem] rounded-[360px] border border-blackolive'
                src={profile.logo_url}
                alt='img_logo'
              />
              <div className='ml-10 w-full'>
                <p className='text-5xl font-bold text-erie'>
                  {profile.umkm_name}
                </p>
                <p className='mt-2 text-3xl font-semibold text-erie'>
                  {profile.owner_name}
                </p>
              </div>
            </div>
            <div className='my-3 h-[1.5px] w-full bg-blackolive'></div>
            <div className='mt-7 w-full'>
              <div className='flex w-full gap-5'>
                <div className='w-1/2'>
                  <p className='text-xl'>{profile.description}</p>
                </div>
                <div className='w-1/2 rounded-lg bg-emerald p-5'>
                  <p className='text-center text-3xl font-bold text-seasalt'>
                    Informasi UMKM
                  </p>
                  <div className='w-100 mt-5 flex gap-2'>
                    <div className='flex w-1/2 flex-col gap-3'>
                      <label className='inline-flex items-center' htmlFor=''>
                        <LucideBriefcaseBusiness className='h-8 w-8 text-seasalt' />
                        <p className='ml-3 text-xl font-semibold text-seasalt'>
                          {profile.business_scale}
                        </p>
                      </label>
                      <label className='inline-flex items-center' htmlFor=''>
                        <Building className='h-8 w-8 text-seasalt' />
                        <p className='ml-3 text-xl font-semibold text-seasalt'>
                          {convertAbbreviation(profile.business_type)}
                        </p>
                      </label>
                      <label className='inline-flex items-center' htmlFor=''>
                        <MapPin className='h-8 w-8 text-seasalt' />
                        <p className='ml-3 text-xl font-semibold text-seasalt'>
                          {profile.location}
                        </p>
                      </label>
                    </div>
                    <div className='flex w-1/2 flex-col gap-3'>
                      <label className='inline-flex items-center' htmlFor=''>
                        <LucideCalendarSync className='h-8 w-8 text-seasalt' />
                        <p className='ml-3 text-xl font-semibold text-seasalt'>
                          {profile.founded_year}
                        </p>
                      </label>
                      <label className='inline-flex items-center' htmlFor=''>
                        <UsersRound className='h-8 w-8 text-seasalt' />
                        <p className='ml-3 text-xl font-semibold text-seasalt'>
                          {profile.employees_number} Karyawan
                        </p>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <Skeleton className='h-screen w-full' />
          </>
        )}
        <div className='mt-10'>
          <p className='text-3xl font-bold text-erie'>
            Detail Pengajuan Dana UMKM
          </p>
          <div className='my-3 h-[1.5px] w-full bg-blackolive'></div>
          <div className='mt-5 flex w-full flex-wrap justify-center gap-5'>
            {fund.length > 0 ? (
              fund.map((data, index) => (
                <div
                  key={index}
                  className='w-[45%] rounded bg-mintcream p-5 shadow-card'
                >
                  <div className='flex w-full'>
                    <div className='w-1/3 rounded border border-blackolive object-cover'>
                      <img src={data.photo_url} alt='img-content' />
                    </div>
                    <div className='flex w-full flex-col'>
                      <div className='ml-3'>
                        <p className='text-2xl font-semibold text-erie'>
                          Dana Terkumpul:
                        </p>
                        <p className='text-2xl font-bold text-erie'>
                          {formatNumber(data.total_fund_collected)} /{' '}
                          {formatNumber(data.required_funds)}
                        </p>
                        <Link
                          className='float-end mt-3'
                          href={`/investor/fundraising/${data.id}`}
                        >
                          <button className='rounded bg-emerald px-5 py-1 text-lg font-bold text-seasalt hover:bg-emeraldhover'>
                            Detail
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <>
                <p className='my-10 text-3xl font-bold text-red-500'>
                  Data Masih Kosong
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </LayoutInv>
  );
};

export default ProfilUmkm;
