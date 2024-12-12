import useSWR from 'swr';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '@/types/token';
import axios from 'axios';

interface Fundraising {
  id: string;
  umkm_id: string;
  photo_url: string;
  required_funds: string;
  description: string;
  createdAt: Date;
}

export function useFundraisings() {
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
    data: fundraisings,
    error,
    isLoading,
    mutate,
  } = useSWR<Fundraising[]>(
    userId ? `/api/umkm/fundraising/${userId}` : null,
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
    fundraisings,
    error,
    isLoading,
    mutate,
  };
}
