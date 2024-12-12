import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const GET = async (req: NextRequest) => {
  const id = req.nextUrl.pathname.split('/').pop();

  try {
    const dataFund = await prisma.fundraising.findMany({
      where: {
        umkm_id: Number(id),
      },
      include: {
        investmentContributors: {
          select: {
            amount: true,
          },
        },
      },
    });

    const fundraisingWithTotal = dataFund.map((fund) => {
      const totalAmount = fund.investmentContributors.reduce(
        (sum, contributor) => sum + Number(contributor.amount),
        0,
      );
      return {
        ...fund,
        total_fund_collected: totalAmount,
      };
    });

    return NextResponse.json({
      status: 'berhasil',
      fundData: fundraisingWithTotal,
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
