'use client';
import LayoutUmkm from '@/components/layouts/layout.umkm';
import { usePathname } from 'next/navigation';
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChangeEvent, useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { useUMKM } from '@/hooks/use-profile-umkm';
import { useLaporan } from '@/hooks/use-laporan';
import { useDetailFundraising } from '@/hooks/use-detail-fundraising';

const formSchema = z.object({
  file: z
    .custom<File>()
    .refine((file) => file instanceof File, {
      message: 'File harus diupload',
    })
    .refine((file) => file.type === 'application/pdf', {
      message: 'File harus berformat PDF',
    }),
});
const formSchema2 = z.object({
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

export default function DetailUMKM({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const pathname = usePathname();
  const id = pathname?.split('/').pop();
  const { umkm, error, isLoading } = useUMKM();
  const { detailfund } = useDetailFundraising(parseInt(id ?? '0'));
  const totalInvestment = detailfund?.investmentContributors.reduce(
    (sum, investment) => sum + parseFloat(investment.amount),
    0,
  );
  const totalWithdrawal = detailfund?.HistoryFundingWithdrawal.reduce(
    (sum, withdrawal) => sum + parseFloat(withdrawal.amount),
    0,
  );
  const { laporan } = useLaporan();
  const reportData = transformData(laporan ?? []);
  const [isUploading, setIsUploading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined,
    },
  });
  const form2 = useForm<z.infer<typeof formSchema2>>({
    resolver: zodResolver(formSchema2),
    defaultValues: {
      amount: 0,
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>, id: string) {
    try {
      setIsUploading(true);
      console.log(id);
      if (id === '0') {
        throw new Error('Upload failed');
      }
      if (!values.file) {
        toast({
          title: 'Error',
          description: 'Please select a file',
          variant: 'destructive',
        });
        return;
      }
      const formData = new FormData();
      if (id) {
        formData.append('id', id.toString()); //
        formData.append('file', values.file);
      } else {
        throw new Error('Upload failed');
      }

      const response = await fetch('/api/umkm/upload-laporan', {
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
        description: 'Document uploaded successfully',
      });

      // Optional: Reset form
      form.reset();
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Upload failed',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  }

  async function onSubmit2(values: z.infer<typeof formSchema2>) {
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
        formData.append('id', id.toString()); //
        formData.append('amount', values.amount.toString());
      } else {
        throw new Error('Upload failed');
      }

      const response = await fetch('/api/umkm/withdraw', {
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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('file', file);
    }
  };
  return (
    <LayoutUmkm title='Dashboard UMKM'>
      <div className='w-full px-6 py-6'>
        <div className='h-full w-full rounded-md bg-white px-8 pb-12 pt-6'>
          <div className='flex items-center'>
            <Link href={'/umkm'}>
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
            <div className='flex flex-col justify-center'>
              <p className='text-center font-poppins text-3xl'>
                Rp{' '}
                {totalWithdrawal
                  ?.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              </p>
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
              <DataTable columns={columns} data={reportData} />
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
                        Upload laporan keuangan kamu setiap bulan.
                      </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit((values) =>
                          onSubmit(values, umkm?.user_id ?? '0'),
                        )}
                        className='space-y-8'
                      >
                        <div className='flex items-center space-x-2'>
                          <div className='grid flex-1 gap-2'>
                            <FormField
                              control={form.control}
                              name='file'
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Laporan</FormLabel>
                                  <FormControl>
                                    <Input
                                      id='laporan'
                                      type='file'
                                      accept='.pdf,application/pdf'
                                      onChange={handleFileChange}
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    Pastikan laporan yang kamu upload benar.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        <DialogFooter className='sm:justify-start'>
                          <DialogClose asChild>
                            <Button type='button' variant='secondary'>
                              Close
                            </Button>
                          </DialogClose>
                          <Button
                            type='submit'
                            disabled={isUploading}
                            className='bg-blue-500 hover:bg-blue-300'
                          >
                            Submit
                          </Button>
                        </DialogFooter>
                      </form>
                    </Form>
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
              <DataTable
                columns={Historycolumns}
                data={detailfund?.HistoryFundingWithdrawal ?? []}
              />
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
                    <Form {...form2}>
                      <form
                        onSubmit={form2.handleSubmit(onSubmit2)}
                        className='space-y-8'
                      >
                        <div className='flex items-center space-x-2'>
                          <div className='grid flex-1 gap-2'>
                            <FormField
                              control={form2.control}
                              name='amount'
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Jumlah</FormLabel>
                                  <FormControl>
                                    <Input
                                      id='amount'
                                      type='number'
                                      {...field} // Add this to bind the field
                                      onChange={(e) =>
                                        field.onChange(Number(e.target.value))
                                      } // Convert string to number
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    Pastikan jumlah yang kamu donasikan benar.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        <DialogFooter className='sm:justify-start'>
                          <DialogClose asChild>
                            <Button type='button' variant='secondary'>
                              Close
                            </Button>
                          </DialogClose>
                          <Button
                            type='submit'
                            disabled={isUploading}
                            className='bg-blue-500 hover:bg-blue-300'
                          >
                            Submit
                          </Button>
                        </DialogFooter>
                      </form>
                    </Form>
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
