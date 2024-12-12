'use client';
import LayoutUmkm from '@/components/layouts/layout.umkm';
import { useFundraisings } from '@/hooks/use-fundraising';
import Link from 'next/link';

const Dashboard = () => {
  const { fundraisings, error, isLoading } = useFundraisings();
  console.log(fundraisings);
  return (
    <LayoutUmkm title='Dashboard UMKM'>
      <div className='mx-4 mt-4 grid grid-cols-3 items-center gap-3'>
        {fundraisings?.map((item, index) => (
          <Link
            href={'/umkm/detail-umkm/' + item.id}
            key={index}
            className='rounded-md bg-white p-4'
          >
            <div className='aspect-square'>
              <img
                className='h-full w-full object-cover'
                src={item.photo_url}
                alt='img_content'
              />
            </div>
            <p>{item.description}</p>
          </Link>
        ))}
      </div>
    </LayoutUmkm>
  );
};

export default Dashboard;
