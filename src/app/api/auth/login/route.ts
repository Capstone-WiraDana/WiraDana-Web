import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { Login } from '@/types/auth';
import jsonwebtoken from "jsonwebtoken"
import 'dotenv/config';

const jwtSecret: string = String(process.env.JWT_SECRET)

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

  const body: Login | null = await req.json().catch(() => null);
  try {
    if (!body || !body.email || !body.password) {
      return NextResponse.json(
        {
          status: 'gagal',
          message: 'Email atau Password kosong',
        },
        { status: 400 },
      );
    }

    const { email, password } = body;

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return NextResponse.json(
        {
          status: 'gagal',
          message: 'Email tidak ditemukan',
        },
        { status: 401 },
      );
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return NextResponse.json(
        {
          status: 'gagal',
          message: 'Password salah',
        },
        { status: 401 },
      );
    }

    const token = jsonwebtoken.sign({ id: user.id, role: user.role }, jwtSecret)

    return NextResponse.json(
      {
        status: 'berhasil',
        message: 'Login berhasil.',
        token: token
      },
      { status: 200 },
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
