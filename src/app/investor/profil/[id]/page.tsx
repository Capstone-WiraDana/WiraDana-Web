'use client';
import { useEffect, useState } from 'react';
import LayoutInv from '@/components/layouts/layout.investor';
import { useParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const Profil = () => {
  const params = useParams();
  const { toast } = useToast();
  const id = params.id;

  const [file, setFile] = useState<File | null>(null);
  const [users, setUsers] = useState<any>();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const fetchData = await fetch(`/api/profile/investor/${id}`, {
        method: 'GET',
      });

      if (fetchData.ok) {
        const data = await fetchData.json();
        setUsers(data.data[0]);
      }
    };

    fetchUserProfile();
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      return toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Gagal memperbarui data foto.',
      });
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`/api/upload/${id}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Data pengguna berhasil diperbarui.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Gagal memperbarui data pengguna.',
        });
      }

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Gagal memperbarui data pengguna.',
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  const handleSubmitDataUsers = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const description = formData.get('description') as string;
    const location = formData.get('location') as string;

    try {
      const response = await fetch(`/api/profile/investor/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, description, location }),
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Data pengguna berhasil diperbarui.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Gagal memperbarui data pengguna.',
        });
      }

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Terjadi kesalahan.',
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  const handleSubmitDataCurrency = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const bank_name = formData.get('bank') as string;
    const account_number = formData.get('rekening') as string;

    try {
      const response = await fetch(`/api/profile/investor/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bank_name, account_number }),
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Data rekening berhasil diperbarui.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Gagal memperbarui data rekening.',
        });
      }
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Terjadi kesalahan.',
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  return (
    <LayoutInv title='Profil Pengguna'>
      <div className='h-auto w-full px-10 py-12'>
        <div className='w-full rounded bg-celadon p-10 shadow-card'>
          <p className='mb-10 text-center text-4xl font-bold text-blackolive'>
            Profil Investor
          </p>
          <form onSubmit={handleSubmit}>
            <div className='flex w-full gap-5'>
              <img
                className='h-32 w-32 rounded-[360px] object-cover'
                src={users?.photo_url}
                alt=''
              />
              <div className='flex flex-col justify-center gap-3'>
                <p className='text-2xl font-semibold text-blackolive'>
                  Update foto Profil Investor
                </p>
                <input
                  className='cursor-pointer'
                  name='file'
                  type='file'
                  onChange={handleFileChange}
                />
                <input
                  className='cursor-pointer rounded bg-emerald px-10 py-2 font-bold text-seasalt hover:bg-emeraldhover'
                  type='submit'
                  value={'Update foto profil'}
                />
              </div>
            </div>
            <div className='mb-5 mt-8 h-[2px] w-full bg-blackolive'></div>
            <p className='text-3xl font-bold text-blackolive'>
              Update Data Investor
            </p>
          </form>
          <form
            onSubmit={handleSubmitDataUsers}
            className='w-100 mt-5 flex gap-5'
          >
            <div className='h-fit w-1/2'>
              <p className='text-2xl font-semibold text-blackolive'>Email</p>
              <input
                className='mt-2 h-10 w-full rounded border border-blackolive ps-2'
                name='email'
                type='email'
                placeholder='Masukkan Email Terbaru Anda...'
                defaultValue={users?.email || ''}
              />
              <p className='mt-3 text-2xl font-semibold text-blackolive'>
                Dekripsi Investor
              </p>
              <textarea
                className='mt-2 h-20 w-full rounded border border-blackolive ps-2'
                name='description'
                id=''
                placeholder='Deskripsikan tentang anda...'
                defaultValue={users?.description || ''}
              ></textarea>
              <input
                className='mt-5 cursor-pointer rounded bg-emerald px-14 py-2 text-2xl font-bold text-seasalt hover:bg-emeraldhover'
                type='submit'
                value={'Update'}
              />
            </div>
            <div className='h-fit w-1/2'>
              <p className='text-2xl font-semibold text-blackolive'>Lokasi</p>
              <input
                className='mt-2 h-10 w-full rounded border border-blackolive ps-2'
                name='location'
                type='text'
                placeholder='Masukkan Lokasi anda...'
                defaultValue={users?.location || ''}
              />
            </div>
          </form>
          <div className='mb-5 mt-8 h-[2px] w-full bg-blackolive'></div>
          <p className='text-3xl font-bold text-blackolive'>Data Rekening</p>
          <form
            onSubmit={handleSubmitDataCurrency}
            className='mt-5 flex w-full flex-col gap-5'
          >
            <div className='flex w-full gap-5'>
              <div className='w-1/2'>
                <p className='text-2xl font-semibold text-blackolive'>
                  Nama Bank
                </p>
                <input
                  className='mt-2 h-10 w-full rounded border border-blackolive ps-2'
                  name='bank'
                  type='text'
                  placeholder='Masukkan Nama Bank anda...'
                  defaultValue={users?.bank_name || ''}
                />
              </div>
              <div className='w-1/2'>
                <p className='text-2xl font-semibold text-blackolive'>
                  Nomor Rekening
                </p>
                <input
                  className='mt-2 h-10 w-full rounded border border-blackolive ps-2'
                  name='rekening'
                  type='text'
                  placeholder='Masukkan Nomor Rekening Bank anda...'
                  defaultValue={users?.account_number || ''}
                />
              </div>
            </div>
            <input
              className='w-full cursor-pointer rounded bg-emerald py-3 text-2xl font-bold text-seasalt hover:bg-emeraldhover'
              type='submit'
              value={'Update Data Rekening'}
            />
          </form>
        </div>
      </div>
    </LayoutInv>
  );
};

export default Profil;
