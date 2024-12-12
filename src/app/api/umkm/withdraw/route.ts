import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const id = formData.get('id') as string;
    const nominal = formData.get('amount') as string;

    if (!nominal) {
      return NextResponse.json(
        { error: 'No amount provided' },
        { status: 400 },
      );
    }
    console.log(id);
    console.log(nominal);
    const data = await prisma.historyFundingWithdrawal.create({
      data: {
        fund_id: parseInt(id),
        amount: parseFloat(nominal),
        status: 'completed',
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
