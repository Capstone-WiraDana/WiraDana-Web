import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { RegisterUmkm } from '@/types/auth';
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

  const body: RegisterUmkm = await req.json().catch(() => null);
  if (
    !body ||
    !body.email ||
    !body.password ||
    !body.umkm_name ||
    !body.owner_name ||
    !body.business_scale ||
    !body.business_type ||
    !body.employees_number ||
    !body.founded_year ||
    !body.location
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
      umkm_name,
      owner_name,
      description,
      business_scale,
      business_type,
      employees_number,
      founded_year,
      location,
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
        role: 'umkm',
        bank_name: bank_name || '-',
        account_number: account_number || '-',
      },
    });

    const userId = addUser.id;

    await prisma.umkm.create({
      data: {
        user_id: userId,
        umkm_name,
        owner_name,
        description: description || null,
        business_scale: (business_scale as 'mikro') || 'kecil' || 'menengah',
        business_type: business_type as 'KM' || 'FT' || 'A' || 'KT' || 'TD' || 'KK' || 'PP' || 'OT' || 'PU' || 'P',
        employees_number,
        founded_year,
        location,
      },
    });

    return NextResponse.json(
      {
        status: 'berhasil',
        message: 'Anda berhasil registrasi menjadi UMKM',
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
