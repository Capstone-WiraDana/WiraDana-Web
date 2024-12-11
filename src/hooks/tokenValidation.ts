import { jwtDecode } from 'jwt-decode';
import { JwtPayload, TokenData } from '@/types/token';

export default async function validateToken(): Promise<TokenData> {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedAccessToken = jwtDecode<JwtPayload>(token);
      if (decodedAccessToken.id && decodedAccessToken.role) {
        const id = decodedAccessToken.id;
        const role = decodedAccessToken.role;
        return { id, role };
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  } else {
    return null;
  }
}
