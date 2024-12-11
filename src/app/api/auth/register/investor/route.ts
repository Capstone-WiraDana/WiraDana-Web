import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { RegisterInv } from '@/types/auth';
import 'dotenv/config';

export const POST = async (req: NextRequest) => {
  const method = req.method;
  if (method !== 'POST') {
    return NextResponse.json(
      {
        status: 'gagal',
        message: 'Method yang digunakan salah',
      },
      { status: 405 },
    );
  }

  const body: RegisterInv = await req.json().catch(() => null);
  if (
    !body ||
    !body.email ||
    !body.password ||
    !body.username ||
    !body.location ||
    !body.type
  ) {
    return NextResponse.json(
      {
        status: 'gagal',
        message: 'Beberapa data kosong',
      },
      { status: 400 },
    );
  }
  try {
    const {
      email,
      password,
      bank_name,
      account_number,
      username,
      description,
      location,
      type,
    } = body;

    const checkEmail = await prisma.user.findUnique({
      where: { email: email },
    });
    if (checkEmail) {
      return NextResponse.json(
        {
          status: 'gagal',
          message: 'Email sudah terdaftar',
        },
        { status: 409 },
      );
    }

    const hashPass: string = await bcrypt.hash(password, 10);

    const addUser = await prisma.user.create({
      data: {
        email: email,
        password: hashPass,
        role: 'investor',
        bank_name: bank_name || '-',
        account_number: account_number || '-',
      },
    });

    const userId = addUser.id;

    await prisma.investor.create({
      data: {
        user_id: userId,
        username: username,
        description: description || null,
        location: location,
        type: (type as 'vc') || 'angel',
      },
    });

    return NextResponse.json(
      {
        status: 'berhasil',
        message: 'Anda berhasil registrasi menjadi investor',
      },
      { status: 201 },
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        status: 'gagal',
        message: err.message || 'Terjadi kesalahan server.',
      },
      { status: 500 },
    );
  }
};
