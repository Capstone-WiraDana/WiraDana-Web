import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import serializeBigInt from '@/hooks/use-serialize';

export const GET = async () => {
  try {
    const data = await prisma.$queryRaw`
    SELECT 
    u.user_id,
    u.logo_url, 
    u.umkm_name, 
    u.business_type, 
    COALESCE(COUNT(s.umkm_id), 0) AS total_post 
    FROM 
        umkm u
    LEFT JOIN 
        story s ON u.user_id = s.umkm_id
    GROUP BY 
        u.user_id, u.logo_url, u.umkm_name, u.business_type
    ORDER BY total_post DESC LIMIT 5;
    `;

    const serializedData = serializeBigInt(data);

    return NextResponse.json(
      {
        status: 'berhasil',
        message: 'data top UMKM berhasil didapatkan',
        data: serializedData,
      },
      {
        status: 200,
      },
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        status: 'gagal',
        message: err.message,
      },
      {
        status: 500,
      },
    );
  }
};
