import useSWR from 'swr';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '@/types/token';
import axios from 'axios';

interface Laporan {
  financial_report_url: string;
}

export function useLaporan(id = '') {
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
  let userId = getUserId();
  if (id != '') {
    userId = parseInt(id);
  }

  const {
    data: laporan,
    error,
    isLoading,
    mutate,
  } = useSWR<Laporan[]>(
    userId ? `/api/umkm/laporan/${userId}` : null,
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
    laporan,
    error,
    isLoading,
    mutate,
  };
}
