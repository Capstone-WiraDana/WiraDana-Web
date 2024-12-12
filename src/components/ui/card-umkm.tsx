import Link from 'next/link';
import convertAbbreviation from '@/hooks/use-convertAbr';

const CardUmkm = ({
  id,
  image_url,
  umkm_name,
  umkm_type,
  umkm_place,
  umkm_year,
}: Readonly<{
  id: number;
  image_url: string;
  umkm_name: string;
  umkm_type: string;
  umkm_place: string;
  umkm_year: number;
}>) => {
  const calculateUmkmAge = (year: number): string => {
    const currentYear = new Date().getFullYear();
    const age = currentYear - year;

    if (age <= 2) {
      return '0–2 Tahun';
    } else if (age >= 3 && age <= 5) {
      return '3–5 Tahun';
    } else {
      return '>5 Tahun';
    }
  };

  return (
    <>
      <div className='w-[21.5rem] rounded-lg bg-white p-5 shadow-card'>
        <div className='flex w-full'>
          <img
            className='w-32 rounded-[5px] object-cover'
            src={image_url}
            alt='image_umkm'
          />
          <div className='ms-2 flex w-full flex-col gap-1'>
            <p className='text-lg font-semibold'>{umkm_name}</p>
            <label className='inline-flex items-center' htmlFor=''>
              <img
                className='w-5'
                src='/img/icons/category.png'
                alt='img_icons'
              />
              <p className='ms-2 max-w-full truncate text-sm font-medium'>
                {convertAbbreviation(umkm_type)}
              </p>
            </label>
            <label className='inline-flex items-center' htmlFor=''>
              <img
                className='w-5'
                src='/img/icons/location-2.png'
                alt='img_icons'
              />
              <p className='ms-2 text-sm font-medium'>{umkm_place}</p>
            </label>
            <label className='inline-flex items-center' htmlFor=''>
              <img className='w-5' src='/img/icons/year.png' alt='img_icons' />
              <p className='ms-2 text-sm font-medium'>
                {calculateUmkmAge(umkm_year)}
              </p>
            </label>
            <div className='mt-2 w-full'>
              <Link className='float-end' href={`/investor/fundraising/${id}`}>
                <p className='rounded bg-emerald px-10 py-1 font-bold text-seasalt hover:bg-emeraldhover'>
                  Detail
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardUmkm;
