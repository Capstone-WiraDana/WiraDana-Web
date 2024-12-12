import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
  const user_id = req.nextUrl.searchParams.get('id');
  try {
    const data = await prisma.investor.findUnique({
      where: { user_id: Number(user_id) },
      select: {
        user_id: true,
        photo_url: true,
        username: true,
      },
    });

    return NextResponse.json({
      status: 'berhasil',
      data: data,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        status: 'gagal',
        message: err.message || 'Terjadi kesalahan server.',
      },
      { status: 500 },
    );
  }
};
