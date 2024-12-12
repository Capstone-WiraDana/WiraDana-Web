import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const data = await prisma.$queryRaw`
    SELECT f.id AS fundraising_id, f.photo_url, u.umkm_name, u.business_type, u.location, u.founded_year
    FROM fundraising f LEFT JOIN umkm u ON f.umkm_id = u.user_id ORDER BY f."createdAt" DESC;
    `;

    return NextResponse.json(
      {
        message: 'berhasil',
        data: data,
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
