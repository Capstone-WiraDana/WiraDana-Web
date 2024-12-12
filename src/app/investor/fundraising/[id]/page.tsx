'use client';
import LayoutInv from '@/components/layouts/layout.investor';
import {
  AlignJustify,
  ArrowLeft,
  ChartNoAxesCombined,
  History,
} from 'lucide-react';
import { Report, columns } from '@/components/table-laporan/columns';
import { DataTable } from '@/components/table-laporan/data-table';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  price: z.number().positive('Must be a positive number'),
});

const Fundraising = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <LayoutInv title='Detail UMKM'>
      <div className='w-full px-4 py-6'>
        <div className='h-full w-full rounded-md bg-white px-8 pb-12 pt-6'>
          <div className='flex items-center'>
            <Link href={'/investor'}>
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
              <DataTable columns={columns} data={[]} />
            </div>
          </div>
        </div>
        <div className='mt-4 h-full w-full rounded-md bg-white px-8 py-6'>
          <p className='ml-4 font-poppins text-xl'>Bantu UMKM</p>
          <div className='ml-4 mt-4'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-8'
              >
                <FormField
                  control={form.control}
                  name='price'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nominal</FormLabel>
                      <FormControl>
                        <Input placeholder='shadcn' {...field} />
                      </FormControl>
                      <FormDescription>
                        Masukan dana yang ingin kamu berikan.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type='submit' className='bg-blue-500 hover:bg-blue-300'>
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </LayoutInv>
  );
};

export default Fundraising;
