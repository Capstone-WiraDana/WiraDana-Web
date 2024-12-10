'use client';

import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import AuthRedirect from '@/components/auth.validation';

const Daftar = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [page, setPage] = useState('daftar');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('investor');
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    document.title = 'WiraDana | Daftar';
  });

  const handleSubmitEmail = async (event: any) => {
    event.preventDefault();

    const checkEmail = await fetch('/api/check-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const response = await checkEmail.json();
    const { message, isRegistered } = response;
    if (isRegistered === true) {
      return toast({
        variant: 'destructive',
        description: message,
      });
    }

    if (email != '' && password != '') {
      role === 'investor' ? setPage('daftar-investor') : setPage('daftar-umkm');
      return toast({
        title: 'Email anda valid!',
        description: `Silahkan isi data untuk profil ${role}`,
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    try {
      const umkm_name = (
        form.elements.namedItem('umkm_name') as HTMLInputElement
      ).value;
      const owner_name = (
        form.elements.namedItem('owner_name') as HTMLInputElement
      ).value;
      const business_scale = (
        form.elements.namedItem('business_scale') as HTMLInputElement
      ).value;
      const business_type = (
        form.elements.namedItem('business_type') as HTMLInputElement
      ).value;
      const employees_number = Number(
        (form.elements.namedItem('employees_number') as HTMLInputElement).value,
      );
      const founded_year = Number(
        (form.elements.namedItem('founded_year') as HTMLInputElement).value,
      );
      const type = (
        form.elements.namedItem('investor_type') as HTMLInputElement
      ).value;
      const username = (form.elements.namedItem('username') as HTMLInputElement)
        .value;
      const description = (
        form.elements.namedItem(
          `${role === 'umkm' ? 'description_umkm' : 'description_inv'}`,
        ) as HTMLInputElement
      ).value;
      const location = (
        form.elements.namedItem(
          `${role === 'umkm' ? 'location_umkm' : 'location_inv'}`,
        ) as HTMLInputElement
      ).value;
      const bank_name = (
        form.elements.namedItem(
          `${role === 'umkm' ? 'bank_name_umkm' : 'bank_name_inv'}`,
        ) as HTMLInputElement
      ).value;
      const account_number = (
        form.elements.namedItem(
          `${role === 'umkm' ? 'account_number_umkm' : 'account_number_inv'}`,
        ) as HTMLInputElement
      ).value;

      if (role == 'umkm') {
        const register = await fetch('/api/auth/register/umkm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            role,
            email,
            password,
            umkm_name,
            owner_name,
            description,
            business_scale,
            business_type,
            employees_number,
            founded_year,
            location,
            bank_name,
            account_number,
          }),
        });

        const response = await register.json();
        const { status, message } = response;
        if (!register.ok) {
          return toast({
            variant: 'destructive',
            title: status,
            description: message,
          });
        }

        toast({
          title: status,
          description: message,
        });

        setTimeout(() => {
          router.push('/auth/masuk');
        }, 1500);
      } else {
        const register = await fetch('/api/auth/register/investor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            role,
            email,
            password,
            username,
            description,
            location,
            type,
            bank_name,
            account_number,
          }),
        });

        const response = await register.json();
        const { status, message } = response;
        if (!register.ok) {
          return toast({
            variant: 'destructive',
            title: status,
            description: message,
          });
        }

        toast({
          title: status,
          description: message,
        });

        setTimeout(() => {
          router.push('/auth/masuk');
        }, 1500);
      }
    } catch (err: any) {
      return toast({
        variant: 'destructive',
        description: err.message,
      });
    }
  };

  return (
    <>
      <Head>
        <title>{document.title}</title>
      </Head>
      <AuthRedirect />
      <div className='flex min-h-screen w-full items-center justify-center bg-emerald'>
        <form className='w-full px-40' onSubmit={handleSubmit}>
          <div
            className={`w-full bg-seasalt px-10 py-5 ${page === 'daftar' ? '' : 'hidden'} rounded-[10px]`}
          >
            <p className='text-center text-5xl font-bold text-blackolive'>
              Daftar
            </p>
            <div className='mt-5 flex flex-col'>
              <p className='text-3xl font-medium text-blackolive'>Role</p>
              <select
                name='role'
                className='mt-2 h-10 w-full rounded-[5px] border-[1.3px] border-erie px-2'
                onChange={(e) => setRole(e.target.value)}
                value={role}
                required
              >
                <option value='investor'>Investor</option>
                <option value='umkm'>UMKM</option>
              </select>
              <p className='mt-5 text-3xl font-medium text-blackolive'>Email</p>
              <input
                className='mt-2 h-10 w-full rounded-[5px] border-[1.3px] border-erie ps-2'
                name='email'
                type='email'
                placeholder='johnDoe@gmail.com'
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className='mt-10 flex flex-col items-center justify-center'>
              <button
                className='cursor-pointer rounded-[5px] bg-[#0D92F4] px-52 py-3 text-3xl font-bold text-seasalt hover:bg-[#3daaf8]'
                onClick={handleSubmitEmail}
              >
                Lanjut
              </button>
              <Link href={'/auth/masuk'}>
                <p className='mt-2 text-lg underline'>
                  Sudah Punya Akun? Masuk
                </p>
              </Link>
            </div>
          </div>
          <div
            className={`w-full bg-seasalt px-10 py-5 ${page === 'daftar-umkm' ? '' : 'hidden'} my-16 rounded-[10px]`}
          >
            <p className='text-center text-5xl font-bold text-blackolive'>
              Daftar {role.toUpperCase()}
            </p>
            <div className='mt-5 flex flex-col'>
              <div className='flex w-full gap-5'>
                <div className='w-1/2'>
                  <p className='mt-5 text-xl font-medium text-blackolive'>
                    Nama UMKM
                  </p>
                  <input
                    className='mt-2 h-10 w-full rounded-[5px] border-[1.3px] border-erie ps-2'
                    name='umkm_name'
                    type='text'
                    placeholder='Masukkan Nama UMKM Anda...'
                  />
                </div>
                <div className='w-1/2'>
                  <p className='mt-5 text-xl font-medium text-blackolive'>
                    Nama Pemilik UMKM
                  </p>
                  <input
                    className='mt-2 h-10 w-full rounded-[5px] border-[1.3px] border-erie ps-2'
                    name='owner_name'
                    type='text'
                    placeholder='Masukkan Nama Pemilik UMKM Anda...'
                  />
                </div>
              </div>
              <p className='mt-5 text-xl font-medium text-blackolive'>
                Deskripsi UMKM{' '}
                <span className='text-sm font-medium text-red-500'>
                  *Dapat diisi nanti
                </span>
              </p>
              <textarea
                name='description_umkm'
                className='mt-2 rounded-[5px] border-[1.3px] border-erie bg-white p-2'
                placeholder='Masukkan Deskripsi untuk UMKM Anda...'
              ></textarea>
              <div className='mt-5 flex w-full gap-5'>
                <div className='w-1/2'>
                  <p className='text-xl font-medium text-blackolive'>
                    Skala UMKM
                  </p>
                  <select
                    name='business_scale'
                    className='mt-2 h-10 w-full rounded-[5px] border-[1.3px] border-erie px-2'
                  >
                    <option value='mikro'>Mikro</option>
                    <option value='kecil'>Kecil</option>
                    <option value='menengah'>Menengah</option>
                  </select>
                </div>
                <div className='w-1/2'>
                  <p className='text-xl font-medium text-blackolive'>
                    Jenis Usaha
                  </p>
                  <select
                    name='business_type'
                    className='mt-2 h-10 w-full rounded-[5px] border-[1.3px] border-erie px-2'
                  >
                    <option value='KM'>Kuliner dan Makanan</option>
                    <option value='FT'>Fashion dan Tekstil</option>
                    <option value='A'>Agribisnis</option>
                    <option value='KT'>Kerajinan Tangan</option>
                    <option value='TD'>Teknologi Digital</option>
                    <option value='KK'>Kesehatan dan Kecantikan</option>
                    <option value='PP'>Pendidikan dan Pelatihan</option>
                    <option value='OT'>Otomotif dan Transportasi</option>
                    <option value='PU'>Perdagangan Umum</option>
                    <option value='P'>Pariwisata</option>
                  </select>
                </div>
              </div>
              <div className='mt-5 flex w-full gap-5'>
                <div className='w-1/3'>
                  <p className='text-xl font-medium text-blackolive'>
                    Jumlah Karyawan
                  </p>
                  <input
                    className='mt-2 h-10 w-full rounded-[5px] border-[1.3px] border-erie ps-2'
                    name='employees_number'
                    type='number'
                    placeholder='Masukkan Jumlah Karyawan Anda...'
                  />
                </div>
                <div className='w-1/3'>
                  <p className='text-xl font-medium text-blackolive'>
                    Tahun Berdiri
                  </p>
                  <input
                    className='mt-2 h-10 w-full rounded-[5px] border-[1.3px] border-erie ps-2'
                    name='founded_year'
                    type='number'
                    placeholder='Masukkan Tahun Berdiri UMKM Anda...'
                  />
                </div>
                <div className='w-1/3'>
                  <p className='text-xl font-medium text-blackolive'>
                    Lokasi UMKM
                  </p>
                  <input
                    className='mt-2 h-10 w-full rounded-[5px] border-[1.3px] border-erie ps-2'
                    name='location_umkm'
                    type='text'
                    placeholder='contoh: Jakarta'
                  />
                </div>
              </div>
              <div className='flex w-full gap-5'>
                <div className='w-1/2'>
                  <p className='mt-5 text-xl font-medium text-blackolive'>
                    Nama Bank{' '}
                    <span className='text-sm font-medium text-red-500'>
                      *Dapat diisi nanti
                    </span>
                  </p>
                  <input
                    className='mt-2 h-10 w-full rounded-[5px] border-[1.3px] border-erie ps-2'
                    name='bank_name_umkm'
                    type='text'
                    placeholder='contoh: BCA, MANDIRI, BNI, BSI'
                  />
                </div>
                <div className='w-1/2'>
                  <p className='mt-5 text-xl font-medium text-blackolive'>
                    Nomor Rekening{' '}
                    <span className='text-sm font-medium text-red-500'>
                      *Dapat diisi nanti
                    </span>
                  </p>
                  <input
                    className='mt-2 h-10 w-full rounded-[5px] border-[1.3px] border-erie ps-2'
                    name='account_number_umkm'
                    type='text'
                    placeholder='Masukkan Nomor Rekening untuk UMKM Anda...'
                  />
                </div>
              </div>
              <div className='mt-10 flex justify-center gap-5'>
                <button
                  className='w-1/2 cursor-pointer rounded-[5px] bg-red-500 py-3 text-2xl font-bold text-seasalt hover:bg-red-400'
                  onClick={(e) => {
                    e.preventDefault();
                    setPage('daftar');
                  }}
                >
                  Kembali
                </button>
                <button
                  className='w-1/2 cursor-pointer rounded-[5px] bg-[#0D92F4] py-3 text-2xl font-bold text-seasalt hover:bg-[#3daaf8]'
                  onClick={(e) => {
                    e.preventDefault();
                    setPage('ketentuan');
                  }}
                >
                  Lanjut
                </button>
              </div>
            </div>
          </div>
          <div
            className={`w-full bg-seasalt px-10 py-5 ${page === 'daftar-investor' ? '' : 'hidden'} my-16 rounded-[10px]`}
          >
            <p className='text-center text-5xl font-bold text-blackolive'>
              Daftar {role}
            </p>
            <div className='mt-5 flex flex-col'>
              <div className='flex w-full gap-5'>
                <div className='w-1/2'>
                  <p className='mt-5 text-xl font-medium text-blackolive'>
                    Tipe Investor
                  </p>
                  <select
                    name='investor_type'
                    className='mt-2 h-10 w-full rounded-[5px] border-[1.3px] border-erie px-2'
                  >
                    <option value='vc'>Investor Perusahaan</option>
                    <option value='angel'>Investor Perseorangan</option>
                  </select>
                </div>
                <div className='w-1/2'>
                  <p className='mt-5 text-xl font-medium text-blackolive'>
                    Nama Investor
                  </p>
                  <input
                    className='mt-2 h-10 w-full rounded-[5px] border-[1.3px] border-erie ps-2'
                    name='username'
                    type='text'
                    placeholder='Masukkan Nama Anda...'
                  />
                </div>
              </div>
              <p className='mt-5 text-xl font-medium text-blackolive'>
                Deskripsi Investor{' '}
                <span className='text-sm font-medium text-red-500'>
                  *Dapat diisi nanti
                </span>
              </p>
              <textarea
                name='description_inv'
                className='mt-2 rounded-[5px] border-[1.3px] border-erie bg-white p-2'
                placeholder='Masukkan Deskripsi untuk UMKM Anda...'
              ></textarea>
              <p className='mt-5 text-xl font-medium text-blackolive'>
                Lokasi Investor
              </p>
              <input
                className='mt-2 h-10 w-full rounded-[5px] border-[1.3px] border-erie ps-2'
                name='location_inv'
                type='text'
                placeholder='Masukkan Lokasi Anda...'
              />
              <div className='flex w-full gap-5'>
                <div className='w-1/2'>
                  <p className='mt-5 text-xl font-medium text-blackolive'>
                    Nama Bank{' '}
                    <span className='text-sm font-medium text-red-500'>
                      *Dapat diisi nanti
                    </span>
                  </p>
                  <input
                    className='mt-2 h-10 w-full rounded-[5px] border-[1.3px] border-erie ps-2'
                    name='bank_name_inv'
                    type='text'
                    placeholder='contoh: BCA, MANDIRI, BNI, BSI'
                  />
                </div>
                <div className='w-1/2'>
                  <p className='mt-5 text-xl font-medium text-blackolive'>
                    Nomor Rekening{' '}
                    <span className='text-sm font-medium text-red-500'>
                      *Dapat diisi nanti
                    </span>
                  </p>
                  <input
                    className='mt-2 h-10 w-full rounded-[5px] border-[1.3px] border-erie ps-2'
                    name='account_number_inv'
                    type='text'
                    placeholder='Masukkan Nomor Rekening untuk UMKM Anda...'
                  />
                </div>
              </div>
              <div className='mt-10 flex justify-center gap-5'>
                <button
                  className='w-1/2 cursor-pointer rounded-[5px] bg-red-500 py-3 text-2xl font-bold text-seasalt hover:bg-red-400'
                  onClick={(e) => {
                    e.preventDefault();
                    setPage('daftar');
                  }}
                >
                  Kembali
                </button>
                <button
                  className='w-1/2 cursor-pointer rounded-[5px] bg-[#0D92F4] py-3 text-2xl font-bold text-seasalt hover:bg-[#3daaf8]'
                  onClick={(e) => {
                    e.preventDefault();
                    setPage('ketentuan');
                  }}
                >
                  Lanjut
                </button>
              </div>
            </div>
          </div>
          <div
            className={`w-full bg-seasalt px-10 py-5 ${page === 'ketentuan' ? '' : 'hidden'} my-16 rounded-[10px]`}
          >
            <p className='text-center text-3xl font-bold capitalize text-blackolive'>
              Persetujuan Ketentuan Registrasi{' '}
              {role == 'umkm' ? role.toUpperCase() : role}
            </p>
            <div className='mt-8'>
              <p className='text-lg font-medium'>
                Dengan mendaftar sebagai pengguna{' '}
                {role == 'umkm' ? role.toUpperCase() : role}, Anda setuju untuk
                mematuhi ketentuan dan peraturan yang berlaku di platform kami,
                termasuk namun tidak terbatas pada:
              </p>
              {role === 'umkm' ? (
                <>
                  <Accordion
                    type='single'
                    collapsible
                    className='mt-4 w-full rounded bg-slate-100'
                  >
                    <AccordionItem value='item-1' className='px-3'>
                      <AccordionTrigger className='text-xl font-medium'>
                        Keaslian Informasi
                      </AccordionTrigger>
                      <AccordionContent className='text-base'>
                        Anda menjamin bahwa semua informasi yang Anda berikan
                        dalam proses registrasi adalah benar, akurat, dan tidak
                        menyesatkan. Anda bertanggung jawab penuh atas keaslian
                        data yang Anda daftarkan.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='item-2' className='px-3'>
                      <AccordionTrigger className='text-xl font-medium'>
                        Penggunaan Platform
                      </AccordionTrigger>
                      <AccordionContent className='text-base'>
                        Anda hanya diperbolehkan menggunakan platform untuk
                        tujuan yang sah sesuai dengan peraturan yang berlaku di
                        Indonesia. Anda tidak diperbolehkan menggunakan platform
                        ini untuk kegiatan yang melanggar hukum atau merugikan
                        pihak lain.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='item-3' className='px-3'>
                      <AccordionTrigger className='text-xl font-medium'>
                        Privasi dan Keamanan
                      </AccordionTrigger>
                      <AccordionContent className='text-base'>
                        Kami berkomitmen untuk melindungi data pribadi Anda.
                        Anda setuju untuk menjaga kerahasiaan akun Anda dan
                        segera memberitahukan kami jika terjadi penyalahgunaan
                        akun Anda.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='item-4' className='px-3'>
                      <AccordionTrigger className='text-xl font-medium'>
                        Perubahan Ketentuan
                      </AccordionTrigger>
                      <AccordionContent className='text-base'>
                        Kami berhak untuk mengubah atau memperbarui ketentuan
                        registrasi ini kapan saja. Anda diharapkan untuk
                        memeriksa ketentuan secara berkala untuk mengetahui
                        perubahan yang mungkin terjadi.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </>
              ) : (
                <>
                  <Accordion
                    type='single'
                    collapsible
                    className='mt-4 w-full rounded bg-slate-100'
                  >
                    <AccordionItem value='item-1' className='px-3'>
                      <AccordionTrigger className='text-xl font-medium'>
                        Investasi yang Bertanggung Jawab
                      </AccordionTrigger>
                      <AccordionContent className='text-base'>
                        Anda menyatakan bahwa Anda memahami risiko yang terkait
                        dengan investasi, terutama di sektor UMKM, dan Anda
                        berkomitmen untuk berinvestasi secara bijaksana sesuai
                        dengan kemampuan finansial Anda.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='item-2' className='px-3'>
                      <AccordionTrigger className='text-xl font-medium'>
                        Keaslian Informasi
                      </AccordionTrigger>
                      <AccordionContent className='text-base'>
                        Anda menjamin bahwa semua informasi yang Anda berikan
                        dalam proses registrasi adalah benar dan akurat,
                        termasuk informasi mengenai identitas dan status
                        keuangan Anda.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='item-3' className='px-3'>
                      <AccordionTrigger className='text-xl font-medium'>
                        Privasi dan Keamanan
                      </AccordionTrigger>
                      <AccordionContent className='text-base'>
                        Kami berkomitmen untuk menjaga kerahasiaan data pribadi
                        Anda. Anda setuju untuk menjaga kerahasiaan akun Anda
                        dan segera memberitahukan kami jika terjadi
                        penyalahgunaan akun Anda.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='item-4' className='px-3'>
                      <AccordionTrigger className='text-xl font-medium'>
                        Hak untuk Memilih Investasi
                      </AccordionTrigger>
                      <AccordionContent className='text-base'>
                        Anda memiliki kebebasan untuk memilih proyek yang ingin
                        Anda danai dan berhak untuk meninjau informasi terkait
                        proyek tersebut sebelum melakukan investasi.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='item-5' className='px-3'>
                      <AccordionTrigger className='text-xl font-medium'>
                        Perubahan Ketentuan
                      </AccordionTrigger>
                      <AccordionContent className='text-base'>
                        Kami berhak untuk mengubah atau memperbarui ketentuan
                        registrasi ini kapan saja. Anda diharapkan untuk
                        memeriksa ketentuan secara berkala untuk mengetahui
                        perubahan yang mungkin terjadi.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </>
              )}
              <label className='w-100 mt-4 inline-flex' htmlFor=''>
                <input
                  type='checkbox'
                  id='terms'
                  name='terms'
                  required
                  className='mr-2 h-6 w-[1.3rem] cursor-pointer'
                  onChange={handleCheckboxChange}
                  checked={isChecked}
                />
                <p className='text-base text-blackolive'>
                  Dengan mengklik checkbox, Anda menyatakan bahwa Anda telah
                  membaca, memahami, dan setuju untuk mematuhi Ketentuan
                  Registrasi {role == 'umkm' ? role.toUpperCase() : role}.
                </p>
              </label>
              <div className='mt-10 flex justify-center gap-5'>
                <button
                  className='w-1/2 cursor-pointer rounded-[5px] bg-red-500 py-3 text-2xl font-bold text-seasalt hover:bg-red-400'
                  onClick={(e) => {
                    e.preventDefault();
                    setIsChecked(false);
                    setPage(role == 'umkm' ? 'daftar-umkm' : 'daftar-investor');
                  }}
                >
                  Kembali
                </button>
                <button
                  className={`w-1/2 rounded-[5px] py-3 text-2xl font-bold text-seasalt ${
                    isChecked
                      ? 'cursor-pointer bg-[#0D92F4] hover:bg-[#3daaf8]'
                      : 'cursor-not-allowed bg-gray-400'
                  }`}
                  type='submit'
                  disabled={!isChecked}
                >
                  Daftar
                </button>
              </div>
            </div>
          </div>
          <div
            className={`w-full bg-seasalt px-10 py-5 ${page === 'ketentuan-investor' ? '' : 'hidden'} rounded-[10px]`}
          >
            <p>test page 3</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                setPage('daftar-investor');
              }}
            >
              Kembali
            </button>
            <button type='submit'>Daftar</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Daftar;
