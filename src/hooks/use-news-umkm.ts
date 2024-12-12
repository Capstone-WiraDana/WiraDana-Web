import useSWR from 'swr';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '@/types/token';
import axios from 'axios';

interface News {
  id: string;
  photo_url: string;
  caption: string;
}

export function useUMKMNews(id = '') {
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
  console.log(userId);
  if (id != '') {
    userId = parseInt(id);
  }

  const {
    data: news,
    error,
    isLoading,
    mutate,
  } = useSWR<News[]>(
    userId ? `/api/umkm/news/${userId}` : null,
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
    news,
    error,
    isLoading,
    mutate,
  };
}
