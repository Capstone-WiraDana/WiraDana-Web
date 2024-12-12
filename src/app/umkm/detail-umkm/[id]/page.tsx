import LayoutUmkm from '@/components/layouts/layout.umkm';
import {
  AlignJustify,
  ArrowLeft,
  ChartNoAxesCombined,
  History,
} from 'lucide-react';
import { Report, columns } from '@/components/table-laporan/columns';
import {
  HistoryType,
  Historycolumns,
} from '@/components/table-riwayat/columns';
import { DataTable } from '@/components/table-laporan/data-table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

async function getData(): Promise<Report[]> {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      file: {
        nama: 'File Upload.pdf',
        url: 'https://www.integral-calculator.com',
      },
      tanggal: '12/12/2024',
    },
    // ...
  ];
}

async function getDataHistory(): Promise<HistoryType[]> {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      nominal: 100000000,
      tanggal: '12/12/2024',
    },
    // ...
  ];
}

export default async function DetailUMKM({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const data = await getData();
  const historyData = await getDataHistory();
  return (
    <LayoutUmkm title='Dashboard UMKM'>
      <div className='w-full px-6 py-6'>
        <div className='h-full w-full rounded-md bg-white px-8 pb-12 pt-6'>
          <div className='flex items-center'>
            <Link href={'/umkm'}>
              <ArrowLeft size={24} />
            </Link>
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
            <div className='flex flex-col justify-center'>
              <p className='text-center font-poppins text-3xl'>Rp. 0</p>
              <p className='text-center'>Dana Ditarik</p>
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
              <p>Laporan Keuangan</p>
            </div>
            <div className='ml-12 mt-2'>
              <DataTable columns={columns} data={data} />
              <div className='mt-2 flex justify-end'>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className='bg-blue-500 hover:bg-blue-300'>
                      Upload Laporan
                    </Button>
                  </DialogTrigger>
                  <DialogContent className='sm:max-w-md'>
                    <DialogHeader>
                      <DialogTitle>Upload Laporan Keuangan</DialogTitle>
                      <DialogDescription>
                        Pastikan file yang kamu upload benar.
                      </DialogDescription>
                    </DialogHeader>
                    <div className='flex items-center space-x-2'>
                      <div className='grid flex-1 gap-2'>
                        <Label htmlFor='laporan'>Laporan</Label>
                        <Input id='laporan' type='file' />
                      </div>
                    </div>
                    <DialogFooter className='sm:justify-start'>
                      <DialogClose asChild>
                        <Button type='button' variant='secondary'>
                          Close
                        </Button>
                      </DialogClose>
                      <Button className='bg-blue-500 hover:bg-blue-300'>
                        Submit
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
          <div className='mt-2'>
            <div className='flex items-center gap-4 font-poppins'>
              <div className='h-fit w-fit rounded-full bg-green-200 p-2'>
                <History size={18} className='text-green-600' />
              </div>
              <p>Riwayat Penarikan</p>
            </div>
            <div className='ml-12 mt-2'>
              <DataTable columns={Historycolumns} data={historyData} />
              <div className='mt-2 flex justify-end'>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className='bg-blue-500 hover:bg-blue-300'>
                      Tarik Dana
                    </Button>
                  </DialogTrigger>
                  <DialogContent className='sm:max-w-md'>
                    <DialogHeader>
                      <DialogTitle>Tarik Dana</DialogTitle>
                      <DialogDescription>
                        Pastikan nominal yang kamu input benar.
                      </DialogDescription>
                    </DialogHeader>
                    <div className='flex items-center space-x-2'>
                      <div className='grid flex-1 gap-2'>
                        <Label htmlFor='laporan'>Nominal</Label>
                        <Input type='number' placeholder='Nominal' />
                      </div>
                    </div>
                    <DialogFooter className='sm:justify-start'>
                      <DialogClose asChild>
                        <Button type='button' variant='secondary'>
                          Close
                        </Button>
                      </DialogClose>
                      <Button className='bg-blue-500 hover:bg-blue-300'>
                        Submit
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutUmkm>
  );
}
