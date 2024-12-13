'use client';
import LayoutInv from '@/components/layouts/layout.investor';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import validateToken from '@/hooks/tokenValidation';
import { toast } from '@/hooks/use-toast';
import { Suspense } from 'react';
import formatSentimentLabel from '@/hooks/use-formatSentiment';

const Detail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('story_id');

  const [userId, setUserId] = useState<number>();
  const [comment, setComment] = useState<string>('');
  const [dataComment, setDataComment] = useState<any[]>([]);
  const [story, setStory] = useState<any>();

  const [positiveCount, setPositiveCount] = useState(0);
  const [neutralCount, setNeutralCount] = useState(0);
  const [negativeCount, setNegativeCount] = useState(0);

  const fetchData = async () => {
    const fetchContent = await fetch(`/api/news/details?id=${id}`, {
      method: 'GET',
    });

    if (fetchContent) {
      const dataContent = await fetchContent.json();
      const data = dataContent.data;

      const comments = data.comment.map((comment: any) => comment.comment);

      const commentsWithSentiment = await analyzeSentimentForComments(comments);

      const updatedComments = data.comment.map(
        (comment: any, index: number) => ({
          ...comment,
          label: commentsWithSentiment[index].label,
        }),
      );

      setStory(data.story[0]);
      setDataComment(updatedComments);
      calculateSentimentCounts(updatedComments);
    }
  };

  const calculateSentimentCounts = (comments: any[]) => {
    let positive = 0;
    let neutral = 0;
    let negative = 0;

    comments.forEach((comment) => {
      if (comment.label === 1) {
        positive++;
      } else if (comment.label === 0) {
        neutral++;
      } else if (comment.label === -1) {
        negative++;
      }
    });

    setPositiveCount(positive);
    setNeutralCount(neutral);
    setNegativeCount(negative);
  };

  const analyzeSentimentForComments = async (comments: string[]) => {
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          texts: comments,
        }),
      });

      const data = await response.json();
      const predictions = data.predictions;

      return comments.map((comment, index) => ({
        comment,
        label: predictions[index],
      }));
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      return comments.map((comment) => ({
        comment,
        label: 0,
      }));
    }
  };

  useEffect(() => {
    const fetchId = async () => {
      const token = await validateToken();
      if (token) {
        const { id } = token;
        setUserId(id);
      }
    };

    fetchId();
    fetchData();
  }, [id]);

  const handleAddComment = async () => {
    if (userId && id && comment) {
      const addComment = await fetch('/api/news/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: userId, story_id: id, comment: comment }),
      });
      if (addComment.ok) {
        toast({
          title: 'Berhasil',
          description: 'Data Komentar Berhasil ditambahkan',
        });

        await fetchData();
        return setComment('');
      }
    }
  };

  return (
    <LayoutInv title='Detail Berita'>
      <div className='w-full px-10 py-12'>
        <button
          className='rounded bg-red-500 px-8 py-2 text-xl font-bold text-seasalt hover:bg-red-400'
          onClick={() => router.back()}
        >
          Kembali
        </button>
        <div className='mt-5 flex w-full gap-5'>
          <div className='w-[60%] rounded-lg bg-white pb-5 shadow-card'>
            {story != null ? (
              <>
                <div className='flex items-center gap-3 px-5 py-4'>
                  <img
                    className='h-12 w-12 rounded-[360px] border border-blackolive object-cover'
                    src={story.logo_url}
                    alt='img_logo'
                  />
                  <Link href={`/investor/profil-umkm/${story.umkm_id}`}>
                    <p className='text-2xl font-bold text-erie'>
                      {story.umkm_name}
                    </p>
                  </Link>
                </div>
                <div className='w-full'>
                  <img
                    className='h-50 w-full object-cover'
                    src={story.photo_url}
                    alt='img_content'
                  />
                </div>
                <div className='px-5 py-4'>
                  <p>{story.caption}</p>
                </div>
              </>
            ) : (
              <div className='flex w-full flex-col space-y-3'>
                <Skeleton className='h-[70vh] w-full rounded-xl' />
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-[35%]' />
                  <Skeleton className='h-4 w-[80%]' />
                </div>
              </div>
            )}
            <div className='flex w-full flex-col px-5'>
              <p className='text-3xl font-semibold text-erie'>Komentar</p>
              <div className='my-2 border-[1px] border-t border-blackolive'></div>
              <div className='flex w-full gap-3 py-2'>
                <input
                  className='h-10 w-[70%] rounded border border-erie ps-2'
                  name='comment'
                  type='text'
                  placeholder='Masukkan Komentar Anda...'
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                />
                <button
                  className='w-[30%] rounded bg-emerald text-lg font-bold text-seasalt hover:bg-emeraldhover'
                  type='submit'
                  onClick={handleAddComment}
                >
                  Tambah Komentar
                </button>
              </div>
              {dataComment.length > 0 ? (
                dataComment.map((data, index) => (
                  <div
                    key={index}
                    className='mt-2 w-full rounded bg-slate-300 p-2'
                  >
                    <div className='flex w-full items-center gap-2'>
                      <img
                        className='w-10 rounded-[360px] border border-erie object-cover'
                        src={data.photo_url}
                        alt='img_photo'
                      />
                      <p className='text-lg font-semibold text-erie'>
                        {data.username}
                      </p>
                      <button
                        className={`ml-auto mr-5 rounded ${data.label === 1 ? 'bg-emerald' : data.label === 0 ? 'bg-bluesky' : 'bg-red-500'} px-8 py-1 font-semibold text-seasalt`}
                      >
                        {formatSentimentLabel(data.label)}
                      </button>
                    </div>
                    <p className='mt-1'>{data.comment}</p>
                  </div>
                ))
              ) : (
                <p className='text-center text-3xl font-bold text-red-500'>
                  Belum Ada Komentar
                </p>
              )}
            </div>
          </div>
          <div className='flex w-[40%] flex-col items-center justify-start gap-5'>
            <div className='w-full rounded bg-emerald p-5 shadow-card'>
              <p className='text-2xl font-bold text-seasalt'>
                Jumlah Komentar Positif
              </p>
              <p className='text-2xl font-semibold text-seasalt'>
                {positiveCount} Komentar
              </p>
            </div>
            <div className='w-full rounded bg-bluesky p-5 shadow-card'>
              <p className='text-2xl font-bold text-seasalt'>
                Jumlah Komentar Netral
              </p>
              <p className='text-2xl font-semibold text-seasalt'>
                {neutralCount} Komentar
              </p>
            </div>
            <div className='w-full rounded bg-red-500 p-5 shadow-card'>
              <p className='text-2xl font-bold text-seasalt'>
                Jumlah Komentar Negatif
              </p>
              <p className='text-2xl font-semibold text-seasalt'>
                {negativeCount} Komentar
              </p>
            </div>
          </div>
        </div>
      </div>
    </LayoutInv>
  );
};

export default function DetailPage() {
  return (
    <Suspense fallback={<Skeleton className='h-full w-full' />}>
      <Detail />
    </Suspense>
  );
}
