import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const GET = async (req: NextRequest) => {
  const id = req.nextUrl.pathname.split('/').pop();

  try {
    const data = await prisma.umkm.findUnique({
      where: {
        user_id: Number(id),
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
        message: err.message,
      },
      {
        status: 500,
      },
    );
  }
};
