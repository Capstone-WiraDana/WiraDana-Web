import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const investorid = formData.get('investor_id') as string;
    const fundid = formData.get('fund_id') as string;
    const nominal = formData.get('amount') as string;
    console.log(investorid);
    if (!nominal) {
      return NextResponse.json(
        { error: 'No amount provided' },
        { status: 400 },
      );
    }
    const data = await prisma.investmentContributor.create({
      data: {
        fund_id: parseInt(fundid),
        investor_id: parseInt(investorid),
        amount: parseFloat(nominal),
        payment_status: 'paid',
      },
    });
    return NextResponse.json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
