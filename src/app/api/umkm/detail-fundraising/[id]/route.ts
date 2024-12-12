import prisma from '@/lib/prisma';
import { type NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const fundId = (await params).id;
    const fundraising = await prisma.fundraising.findFirst({
      where: {
        id: parseInt(fundId ?? '0'),
      },
      include: {
        investmentContributors: {
          where: {
            payment_status: 'paid', // Only count completed payments
          },
          select: {
            amount: true,
          },
        },
        HistoryFundingWithdrawal: {
          where: {
            status: 'completed', // Only count completed withdrawals
          },
          select: {
            amount: true,
            createdAt: true,
            id: true,
          },
        },
      },
    });
    console.log(fundraising);
    if (!fundraising) {
      return NextResponse.json(
        { error: 'Fundraising not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(fundraising);
  } catch (error) {
    console.error('Error fetching fundraising:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
