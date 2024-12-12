import useSWR from 'swr';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '@/types/token';
import axios from 'axios';

interface UMKM {
  user_id: string;
  umkm_name: string;
  logo_url: string;
}

export function useUMKM(id = '') {
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
    data: umkm,
    error,
    isLoading,
    mutate,
  } = useSWR<UMKM>(
    userId ? `/api/umkm/users/${userId}` : null,
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
    umkm,
    error,
    isLoading,
    mutate,
  };
}
