'use client';

import Link from 'next/link';
import { useState } from 'react';

const CardNews = ({
  umkm_id,
  logo,
  name,
  image_content,
  likes,
  comments,
  caption,
  isLiked,
}: Readonly<{
  umkm_id: number;
  story_id: number;
  logo: string;
  name: string;
  image_content: string;
  likes: number;
  comments: number;
  caption: string;
  isLiked: boolean;
}>) => {
  const [countLike, setCountLike] = useState(likes);
  const [liked, setLiked] = useState(isLiked);
  const [showFullCaption, setShowFullCaption] = useState(false);

  const handleLike = async (
    user_id?: number,
    story_id?: number,
  ): Promise<void> => {
    if (liked) {
      setCountLike((prev) => prev - 1);
    } else {
      setCountLike((prev) => prev + 1);
    }
    setLiked((prev) => !prev);
  };

  return (
    <>
      <div className='w-full rounded bg-[#FFFFFF] py-5 shadow-card'>
        <div className='flex w-full items-center gap-5 px-5'>
          <img
            className='w-10 rounded-[360px] border-2 border-blackolive object-cover'
            src={logo}
            alt='img_logo'
          />
          <Link href={`/investor/profil-umkm/${umkm_id}`}>
            <p className='text-2xl font-semibold text-erie'>{name}</p>
          </Link>
        </div>
        <div className='my-3 w-full'>
          <img
            className='h-[55vh] w-full object-cover'
            src={image_content}
            alt='img_content'
          />
        </div>
        <div className='my-2 flex items-center gap-3 px-5'>
          <img
            className='w-10 cursor-pointer'
            src={liked ? '/img/icons/liked.png' : '/img/icons/like.png'}
            alt='img_like'
            onClick={() => {
              void handleLike();
            }}
          />
          <p className='text-lg font-semibold'>{countLike}</p>
          <Link href={`/investor/berita/detail?story_id=${story_id}`}>
            <img
              className='w-10 cursor-pointer'
              src='/img/icons/comment.png'
              alt='img_comment'
            />
          </Link>
        </div>
        <div className='mt-1 px-5'>
          <p
            className={`text-lg ${!showFullCaption ? 'line-clamp-3' : ''}`}
            style={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {caption}
          </p>
          <button
            className={`text-lg ${showFullCaption ? 'text-red-500' : 'text-blue-500'} hover:underline`}
            onClick={() => setShowFullCaption(!showFullCaption)}
          >
            {showFullCaption ? 'Sembunyikan' : 'Lainnya'}
          </button>
        </div>
      </div>
    </>
  );
};

export default CardNews;
