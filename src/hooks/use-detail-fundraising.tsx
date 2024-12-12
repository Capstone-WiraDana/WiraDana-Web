import useSWR from 'swr';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '@/types/token';
import axios from 'axios';

interface Fundraising {
  umkm_id: string;
  required_funds: string;
  description: string;
  createdAt: Date;
  investmentContributors: [
    {
      amount: string;
    },
  ];
  HistoryFundingWithdrawal: [
    {
      amount: string;
      createdAt: Date;
      id: string;
    },
  ];
}

export function useDetailFundraising(id: number) {
  const getUserId = () => {
    if (typeof window === 'undefined') return null; // Check for server-side rendering

    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decodedToken = jwtDecode<JwtPayload>(token);
      return decodedToken.id;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  const userId = getUserId();

  const {
    data: detailfund,
    error,
    isLoading,
    mutate,
  } = useSWR<Fundraising>(
    userId ? `/api/umkm/detail-fundraising/${id}` : null,
    async (url) => {
      const token = localStorage.getItem('token');
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    {
      revalidateOnFocus: false, // Optional: prevent unnecessary revalidation
      shouldRetryOnError: false, // Optional: prevent retrying on error
    },
  );

  return {
    detailfund,
    error,
    isLoading,
    mutate,
  };
}
