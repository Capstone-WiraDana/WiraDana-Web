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
  caption: z.string().min(1, { message: 'Caption tidak boleh kosong' }),
});

const Post = () => {
  const { news, error, isLoading } = useUMKMNews();
  const { umkm } = useUMKM();
  const [isUploading, setIsUploading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined,
      caption: '',
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
        formData.append('caption', values.caption);
      } else {
        throw new Error('Upload failed');
      }

      const response = await fetch('/api/umkm/tambah-post', {
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
          <p className='font-poppins text-lg font-medium'>Daftar Kegiatan</p>
          <p className='font-poppins text-sm text-blackolive'>
            Tambahkan dokumentasi kegiatan kamu untuk meningkatkan kepercayaan
            investor.
          </p>
        </div>
        <div className='mt-4 h-fit w-full rounded-md bg-white px-8 pb-6 pt-6'>
          <div>
            <p className='font-poppins text-lg font-medium'>Koleksi Kegiatan</p>
            <p className='font-poppins text-sm text-blackolive'>
              Dokumentasi kegiatan kamu selama ini.
            </p>
          </div>
          <div className='mt-4 grid grid-cols-3 items-center gap-1'>
            {news?.map((item, index) => (
              <div key={index} className='aspect-square'>
                <img
                  className='h-full w-full object-cover'
                  src={item.photo_url}
                  alt='img_content'
                />
              </div>
            ))}
          </div>
        </div>
        <div className='mt-4 h-fit w-full rounded-md bg-white px-8 pb-6 pt-6'>
          <div>
            <p className='font-poppins text-lg font-medium'>
              Tambahkan Kegiatan
            </p>
            <p className='font-poppins text-sm text-blackolive'>
              Tambahkan kegiatan kamu selama ini.
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
                      <FormLabel>Laporan</FormLabel>
                      <FormControl>
                        <Input
                          id='laporan'
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
                  name='caption'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Caption</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder='Masukan Caption' />
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
