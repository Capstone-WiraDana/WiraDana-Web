import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const userId = (await params).id;
    const umkm = await prisma.report.findMany({
      where: {
        umkm_id: parseInt(userId),
      },
    });
    console.log(umkm);
    if (!umkm) {
      return NextResponse.json({ error: 'UMKM not found' }, { status: 404 });
    }

    return NextResponse.json(umkm);
  } catch (error) {
    console.error('Error fetching UMKM:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
