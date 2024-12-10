import { NextRequest, NextResponse } from 'next/server';
import { CheckEmail } from '@/types/check';
import prisma from '@/lib/prisma';

export const POST = async (req: NextRequest) => {
  const body: CheckEmail = await req.json().catch(() => null);
  if (!body || !body.email) {
    return NextResponse.json(
      {
        status: 'gagal',
        message: 'Email kosong',
      },
      { status: 400 },
    );
  }

  try {
    const { email } = body;
    let response: boolean = false;
    let message: string = 'Email belum terdaftar';

    const user = await prisma.user.findUnique({ where: { email: email } });
    if (user) {
      response = true;
      message = 'Email sudah terdaftar';
    }

    return NextResponse.json({
        status : "berhasil",
        message : message,
        isRegistered : response
    }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        status: 'gagal',
        message: 'Email atau Password kosong',
      },
      { status: 400 },
    );
  }
};
