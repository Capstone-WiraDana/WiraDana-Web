export type TokenData = { id: number; role: string } | null;

export type JwtPayload = {
  id: number;
  role: string;
  iat: number;
};
