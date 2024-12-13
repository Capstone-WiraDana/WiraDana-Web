import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const countDataInv = await prisma.user.count({
      where: {
        role: 'investor',
      },
    });

    const countDataUmkm = await prisma.user.count({
      where: {
        role: 'umkm',
      },
    });

    const countDataUmkmHelped = await prisma.investmentContributor.groupBy({
      by: ['fund_id'],
      _count: {
        fund_id: true,
      },
    });

    const uniqueFundCount = countDataUmkmHelped.length;

    return NextResponse.json({
      message: 'berhasil',
      dataInv: countDataInv,
      dataUmkm: countDataUmkm,
      dataFund: uniqueFundCount,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        status: 'Error',
        message: err.message,
      },
      { status: 500 },
    );
  }
};
