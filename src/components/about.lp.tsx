import Link from 'next/link';

const About: React.FC = () => {
  return (
    <>
      <div id='about' className='px-20 py-10'>
        <div className='w-full'>
          <p className='text-5xl font-semibold leading-[3.5rem] text-blackolive'>
            Memperkenalkan <span className='text-emerald'>WiraDana</span> :
            Platform Terpercaya untuk Mendukung UMKM Indonesia.
          </p>
          <div className='my-10 flex justify-center gap-10'>
            <div className='flex w-1/2 items-center bg-blackolive p-5'>
              <div>
                <p className='text-2xl font-semibold text-emerald'>
                  Menghubungkan UMKM dan Investor
                </p>
                <p className='text-xl font-medium text-seasalt'>
                  WiraDana adalah platform yang menjembatani UMKM Indonesia
                  dengan para investor, menciptakan ekosistem kolaboratif untuk
                  mendukung pertumbuhan bisnis.
                </p>
              </div>
            </div>
            <div className='w-1/2'>
              <img
                className='rounded-tr-[360px]'
                src='/img/content/about-content-1.png'
                alt='img_content'
              />
            </div>
          </div>
          <div className='mt-10 flex justify-center gap-10'>
            <div className='w-1/2'>
              <img
                className='rounded-bl-[360px]'
                src='/img/content/about-content-2.png'
                alt='img_content'
              />
            </div>
            <div className='flex w-1/2 items-center bg-emerald p-5'>
              <div>
                <p className='text-2xl font-semibold text-blackolive'>
                  Mendorong Inovasi dan Keberlanjutan
                </p>
                <p className='text-xl font-medium text-seasalt'>
                  Kami berkomitmen untuk mendorong inovasi dalam sektor UMKM
                  sekaligus memastikan keberlanjutan bisnis melalui solusi
                  pendanaan yang tepat dan terpercaya.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id='about2' className='bg-mintcream px-20 py-10'>
        <div className='flex w-full justify-between'>
          <div className='flex w-[65%] flex-col justify-center rounded-[10px] bg-blackolive p-5 shadow-card'>
            <div>
              <p className='text-5xl font-bold text-seasalt'>
                Kenapa memilih <br />
                <span className='text-emerald'>WiraDana</span>?
              </p>
            </div>
            <div className='mt-10 w-[100%]'>
              <Link href={'/masuk'} className='float-end'>
                <button className='rounded-[10px] bg-emerald px-5 py-4 text-3xl font-bold text-seasalt hover:bg-[#4cd298]'>
                  Mulai Menjelajah
                </button>
              </Link>
            </div>
          </div>
          <div className='flex h-[auto] w-[30%] flex-col justify-center rounded-[10px] bg-white p-5 shadow-card'>
            <img
              className='w-20'
              src='/img/icons/transparation.png'
              alt='img_icon'
            />
            <p className='text-xl font-bold text-erie'>Transparansi Data</p>
            <p className='text-base text-blackolive'>
              WiraDana menyediakan informasi yang detail, jelas, dan terpercaya
              mengenai setiap UMKM, mulai dari perkembangan usaha hingga laporan
              keuangan, sehingga Anda dapat mengambil keputusan investasi dengan
              keyakinan.
            </p>
          </div>
        </div>
        <div className='mt-10 flex justify-between'>
          <div className='flex h-[auto] w-[30%] flex-col justify-center rounded-[10px] bg-white p-5 shadow-card'>
            <img className='w-20' src='/img/icons/access.png' alt='img_icon' />
            <p className='text-xl font-bold text-erie'>Kemudahan Akses</p>
            <p className='text-base text-blackolive'>
              Dengan antarmuka yang mudah digunakan, Anda dapat memantau
              aktivitas UMKM secara real-time, memberikan kenyamanan dalam
              memonitor investasi kapan saja.
            </p>
          </div>
          <div className='flex h-[auto] w-[30%] flex-col justify-center rounded-[10px] bg-white p-5 shadow-card'>
            <img className='w-20' src='/img/icons/focus.png' alt='img_icon' />
            <p className='text-xl font-bold text-erie'>Fokus Spesifik</p>
            <p className='text-base text-blackolive'>
              Fitur filter kategori memungkinkan Anda mencari UMKM berdasarkan
              bidang bisnis yang sesuai dengan minat dan tujuan investasi Anda.
            </p>
          </div>
          <div className='flex h-[auto] w-[30%] flex-col justify-center rounded-[10px] bg-white p-5 shadow-card'>
            <img className='w-20' src='/img/icons/growth.png' alt='img_icon' />
            <p className='text-xl font-bold text-erie'>Dukungan Pertumbuhan</p>
            <p className='text-base text-blackolive'>
              WiraDana membantu UMKM berkembang dengan memberikan akses
              pendanaan yang mudah, sekaligus membuka peluang investasi yang
              menguntungkan bagi Anda.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
