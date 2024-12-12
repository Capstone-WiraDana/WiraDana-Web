import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import serializeBigInt from '@/hooks/use-serialize';

export const GET = async (req: NextRequest) => {
  const id = req.nextUrl.pathname.split('/').pop();

  try {
    const data = await prisma.$queryRaw`
    SELECT u.*, i.* 
    FROM investor i 
    LEFT JOIN users u 
    ON i.user_id = u.id 
    WHERE i.user_id = ${Number(id)} OR u.id = ${Number(id)};
    `;

    const serializedData = await serializeBigInt(data);

    return NextResponse.json(
      {
        status: 'berhasil',
        data: serializedData,
      },
      { status: 200 },
    );
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

type Update = {
  email: string;
  description: string;
  location: string;
};

export async function PUT(req: NextRequest) {
  const body: Update = await req.json().catch(() => null);
  const id = req.nextUrl.pathname.split('/').pop();

  if (!id || !body || !body.email || !body.description || !body.location) {
    return NextResponse.json(
      { message: 'Missing required fields' },
      { status: 400 },
    );
  }

  try {
    const { email, description, location } = body;
    await prisma.user.update({
      data: {
        email: email,
      },
      where: {
        id: Number(id),
      },
    });

    await prisma.investor.update({
      data: {
        description: description,
        location: location,
      },
      where: {
        user_id: Number(id),
      },
    });
    return NextResponse.json(
      { message: 'Profile updated successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}

type Update2 = {
  bank_name: string;
  account_number: string;
};

export async function POST(req: NextRequest) {
  const body: Update2 = await req.json().catch(() => null);
  const id = req.nextUrl.pathname.split('/').pop();

  if (!id || !body || !body.account_number || !body.bank_name) {
    return NextResponse.json(
      { message: 'Missing required fields' },
      { status: 400 },
    );
  }

  try {
    const { account_number, bank_name } = body;

    await prisma.user.update({
      where: { id: Number(id) },
      data: {
        bank_name,
        account_number,
      },
    });

    return NextResponse.json(
      {
        message: 'Bank account updated successfully',
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
