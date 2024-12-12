import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import serializeBigInt from '@/hooks/use-serialize';

export const GET = async (req: NextRequest) => {
  const id = req.nextUrl.pathname.split('/').pop();

  try {
    const getData = await prisma.$queryRaw`
    SELECT ic.investor_id, u.umkm_name, ic.amount, ic.payment_status, ic.latest_amount_return, ic.latest_amount_status,
    ic.latest_return_date, ic."createdAt" FROM investment_contributors ic LEFT JOIN fundraising f ON
    ic.fund_id = f.id LEFT JOIN umkm u ON f.umkm_id = u.user_id WHERE ic.investor_id = ${Number(id)}
    ORDER BY ic."createdAt" DESC;
    `;

    const serializeData = await serializeBigInt(getData);

    return NextResponse.json({
      status: 'berhasil',
      data: serializeData,
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: 'Internal server error', message2: err },
      { status: 500 },
    );
  }
};
