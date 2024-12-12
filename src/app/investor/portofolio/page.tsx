'use client';
import LayoutInv from '@/components/layouts/layout.investor';
import validateToken from '@/hooks/tokenValidation';
import { useEffect, useState } from 'react';
import formatNumber from '@/hooks/use-format';

interface PortofolioData {
  investor_id: number;
  umkm_name: string;
  amount: string;
  payment_status: string;
  latest_amount_return: string;
  latest_amount_status: string;
  latest_return_date: string;
  createdAt: string;
}

const Portofolio = () => {
  const [porto, setPorto] = useState<PortofolioData[]>([]);
  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    const getId = async () => {
      const token = await validateToken();
      if (token) {
        const { id } = token;
        setId(id);
      }
    };

    getId();
  }, []);

  useEffect(() => {
    const fetchDataPorto = async () => {
      if (id) {
        const fetchData = await fetch(`/api/portofolio/${id}`, {
          method: 'GET',
        });

        if (fetchData.ok) {
          const data = await fetchData.json();
          setPorto(data.data);
        }
      }
    };

    fetchDataPorto();
  }, [id]);

  return (
    <LayoutInv title='Portofolio'>
      <div className='h-auto w-full px-10 py-12'>
        <p className='text-4xl font-bold text-erie'>Portofolio Saya</p>
        <div className='mt-8'>
          {porto.length === 0 ? (
            <p className='text-center text-xl'>Tidak ada data portofolio.</p>
          ) : (
            <table className='min-w-full border border-gray-300 bg-white'>
              <thead className='bg-gray-100'>
                <tr>
                  <th className='border-b px-6 py-4 text-left text-sm font-medium text-gray-900'>
                    No
                  </th>
                  <th className='border-b px-6 py-4 text-left text-sm font-medium text-gray-900'>
                    Nama UMKM
                  </th>
                  <th className='border-b px-6 py-4 text-left text-sm font-medium text-gray-900'>
                    Jumlah Investasi
                  </th>
                  <th className='border-b px-6 py-4 text-left text-sm font-medium text-gray-900'>
                    Status Pembayaran
                  </th>
                  <th className='border-b px-6 py-4 text-left text-sm font-medium text-gray-900'>
                    Status Pengembalian
                  </th>
                  <th className='border-b px-6 py-4 text-left text-sm font-medium text-gray-900'>
                    Jumlah Pengembalian Terakhir
                  </th>
                  <th className='border-b px-6 py-4 text-left text-sm font-medium text-gray-900'>
                    Tanggal Pengembalian Terakhir
                  </th>
                  <th className='border-b px-6 py-4 text-left text-sm font-medium text-gray-900'>
                    Tanggal Investasi
                  </th>
                </tr>
              </thead>
              <tbody>
                {porto.map((item, index) => (
                  <tr key={index} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 text-center text-sm text-gray-900'>
                      {index + 1}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-900'>
                      {item.umkm_name}
                    </td>
                    <td className='px-6 py-4 text-center text-sm text-gray-900'>
                      Rp {formatNumber(Number(item.amount))}
                    </td>
                    <td className='px-6 py-4 text-center text-sm text-gray-900'>
                      {item.payment_status}
                    </td>
                    <td className='px-6 py-4 text-center text-sm text-gray-900'>
                      {item.latest_amount_status}
                    </td>
                    <td className='px-6 py-4 text-center text-sm text-gray-900'>
                      Rp {formatNumber(Number(item.latest_amount_return))}
                    </td>
                    <td className='px-6 py-4 text-center text-sm text-gray-900'>
                      {new Date(item.latest_return_date).toLocaleDateString()}
                    </td>
                    <td className='px-6 py-4 text-center text-sm text-gray-900'>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </LayoutInv>
  );
};

export default Portofolio;
