'use client';
import LayoutUmkm from '@/components/layouts/layout.umkm';
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
import { Input } from '@/components/ui/input';
import { useUMKMNews } from '@/hooks/use-news-umkm';
import { useUMKM } from '@/hooks/use-profile-umkm';
import { toast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  file: z
    .custom<File>()
    .refine((file) => file instanceof File, {
      message: 'File harus diupload',
    })
    .refine(
      (file) =>
        ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(
          file.type,
        ),
      {
        message: 'File harus berformat gambar (JPEG, PNG, atau WEBP)',
      },
    ),
  description: z.string().min(1, { message: 'Deskripsi tidak boleh kosong' }),
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

const Post = () => {
  const { umkm } = useUMKM();
  const [isUploading, setIsUploading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined,
      description: '',
      amount: 0,
    },
  });
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('file', file);
    }
  };
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
        formData.append('amount', values.amount.toString());
        formData.append('desc', values.description);
      } else {
        throw new Error('Upload failed');
      }

      const response = await fetch('/api/umkm/add-fundraising', {
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

  return (
    <LayoutUmkm title='Post UMKM'>
      <div className='w-full px-6 py-6'>
        <div className='flex h-fit w-full flex-col items-start justify-center rounded-md border-l-8 border-l-blue-500 bg-white px-8 pb-6 pt-6'>
          <p className='font-poppins text-lg font-medium'>Ajukan Dana</p>
          <p className='font-poppins text-sm text-blackolive'>
            Ajukan dana untuk membantu bisnismu.
          </p>
        </div>
        <div className='mt-4 h-fit w-full rounded-md bg-white px-8 pb-6 pt-6'>
          <div>
            <p className='font-poppins text-lg font-medium'>Data Pengajuan</p>
            <p className='font-poppins text-sm text-blackolive'>
              Silahlan cek kembali data pengajuan kamu.
            </p>
          </div>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((values) =>
                  onSubmit(values, umkm?.user_id ?? '0'),
                )}
                className='mt-4 space-y-8'
              >
                <FormField
                  control={form.control}
                  name='file'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cover</FormLabel>
                      <FormControl>
                        <Input
                          id='cover'
                          type='file'
                          onChange={handleFileChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deskripsi</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder='Masukan Deskripsi' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='amount'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jumlah Dana</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder='Masukan Dana' />
                      </FormControl>
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
    </LayoutUmkm>
  );
};

export default Post;
