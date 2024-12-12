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
import { usePathname } from 'next/navigation';
import { useDetailFundraising } from '@/hooks/use-detail-fundraising';
import { useLaporan } from '@/hooks/use-laporan';
import { useUMKM } from '@/hooks/use-profile-umkm';
import { useEffect, useState } from 'react';
import validateToken from '@/hooks/tokenValidation';

const formSchema = z.object({
  amount: z
    .number()
    .min(1, 'Amount harus lebih dari 0')
    .positive('Amount harus berupa angka positif')
    .int('Amount harus berupa bilangan bulat')
    // Optional: to handle string inputs
    .or(
      z.string().regex(/^\d+$/, 'Amount harus berupa angka').transform(Number),
    )
    // Optional: custom refinement
    .refine((val) => val <= 1000000000, {
      message: 'Amount tidak boleh melebihi 1,000,000,000',
    }),
});

const transformData = (data: any[]): Report[] => {
  return data.map((item) => ({
    id: item.id.toString(), // Convert number to string
    file: item.financial_report_url,
    tanggal: new Date(item.createdAt).toISOString().split('T')[0],
  }));
};
const Fundraising = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [investorId, setInvestorId] = useState<string | null>(null);
  const pathname = usePathname();
  const id = pathname?.split('/').pop();
  const { detailfund, isLoading } = useDetailFundraising(parseInt(id ?? '0'));
  const { laporan } = useLaporan(detailfund?.umkm_id ?? '');
  const reportData = transformData(laporan ?? []);
  const { umkm } = useUMKM(detailfund?.umkm_id ?? '');

  const totalInvestment = detailfund?.investmentContributors.reduce(
    (sum, investment) => sum + parseFloat(investment.amount),
    0,
  );
  const totalWithdrawal = detailfund?.HistoryFundingWithdrawal.reduce(
    (sum, withdrawal) => sum + parseFloat(withdrawal.amount),
    0,
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsUploading(true);
      console.log(id);
      if (!values.amount) {
        toast({
          title: 'Error',
          description: 'Please fill amount',
          variant: 'destructive',
        });
        return;
      }
      const formData = new FormData();
      if (id) {
        formData.append('fund_id', id.toString());
        formData.append('amount', values.amount.toString());
        formData.append('investor_id', investorId ?? '');
      } else {
        throw new Error('Upload failed');
      }

      const response = await fetch('/api/umkm/add-investor', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }
      console.log(data);
      toast({
        title: 'Success',
        description: 'Donation has been given successfully',
      });

      // Optional: Reset form
      form.reset();
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Donation failed',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  }

  useEffect(() => {
    const getInvestorId = async () => {
      const tokenData = await validateToken();
      if (tokenData && tokenData.role === 'investor') {
        setInvestorId(tokenData.id.toString());
      }
    };
    getInvestorId();
  }, []);
  return (
    <LayoutInv title='Detail UMKM'>
      <div className='w-full px-4 py-6'>
        <div className='h-full w-full rounded-md bg-white px-8 pb-12 pt-6'>
          <div className='flex items-center'>
            <Link href={'/investor/cari-umkm'}>
              <ArrowLeft size={24} />
            </Link>
            <p className='ml-4 font-poppins text-xl'>{umkm?.umkm_name}</p>
          </div>
          <div className='mt-4 flex justify-center gap-12'>
            <div className='flex flex-col justify-center'>
              <p className='text-center font-poppins text-3xl'>
                Rp{' '}
                {detailfund?.required_funds
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              </p>
              <p className='text-center'>Dana Pengajuan</p>
            </div>
            <div className='flex flex-col justify-center'>
              <p className='text-center font-poppins text-3xl'>
                Rp{' '}
                {totalInvestment
                  ?.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
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
              {detailfund?.description}
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
              <DataTable columns={columns} data={reportData ?? []} />
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
                  name='amount'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nominal</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type='text' // Change to text
                          placeholder='Enter amount'
                          onChange={(e) => {
                            field.onChange(
                              e.target.value === '' ? '' : e.target.value,
                            );
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Masukan dana yang ingin kamu berikan.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type='submit'
                  disabled={isUploading}
                  className='bg-blue-500 hover:bg-blue-300'
                >
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
