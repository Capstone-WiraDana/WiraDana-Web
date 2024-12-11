import LayoutUmkm from '@/components/layouts/layout.umkm';
import {
  AlignJustify,
  ArrowLeft,
  ChartNoAxesCombined,
  History,
} from 'lucide-react';
export default async function DetailUMKM({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return (
    <LayoutUmkm title='Dashboard UMKM'>
      <div className='w-full px-6 py-6'>
        <div className='h-full w-full rounded-md bg-white px-6 pb-12 pt-6'>
          <div className='flex items-center'>
            <ArrowLeft size={24} />
            <p className='ml-4 font-poppins text-xl'>Title</p>
          </div>
          <div className='mt-4 flex justify-center gap-12'>
            <div className='flex flex-col justify-center'>
              <p className='text-center font-poppins text-3xl'>
                Rp. 300.000.000,00
              </p>
              <p className='text-center'>Dana Pengajuan</p>
            </div>
            <div className='flex flex-col justify-center'>
              <p className='text-center font-poppins text-3xl'>
                Rp. 300.000.000,00
              </p>
              <p className='text-center'>Dana Sekarang</p>
            </div>
          </div>
          <div className='mt-8'>
            <div className='flex items-center gap-4 font-poppins'>
              <div className='h-fit w-fit rounded-full bg-yellow-200 p-2'>
                <AlignJustify size={18} className='text-yellow-600' />
              </div>
              <p>Deskripsi</p>
            </div>
            <p className='ml-12 text-justify text-body-1'>
              oaksopdjashapsdjapsjdpajspskadbkasd
            </p>
          </div>
          <div className='mt-4'>
            <div className='flex items-center gap-4 font-poppins'>
              <div className='h-fit w-fit rounded-full bg-red-200 p-2'>
                <ChartNoAxesCombined size={18} className='text-red-500' />
              </div>
              <p>Laporan Kemajuan</p>
            </div>
            <p className='ml-12 text-justify text-body-1'>
              oaksopdjashapsdjapsjdpajspskadbkasd
            </p>
          </div>
          <div className='mt-4'>
            <div className='flex items-center gap-4 font-poppins'>
              <div className='h-fit w-fit rounded-full bg-green-200 p-2'>
                <History size={18} className='text-green-600' />
              </div>
              <p>Riwayat Penarikan</p>
            </div>
            <p className='ml-12 text-justify text-body-1'>
              oaksopdjashapsdjapsjdpajspskadbkasd
            </p>
          </div>
        </div>
      </div>
    </LayoutUmkm>
  );
}
