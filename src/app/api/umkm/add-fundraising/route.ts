import { NextResponse } from 'next/server';
import { uploadToGCS } from '@/lib/googleStorageConfig';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const id = formData.get('id') as string;
    const caption = formData.get('desc') as string;
    const amount = formData.get('amount') as string;
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    const fileUrl = await uploadToGCS(file);
    const data = await prisma.fundraising.create({
      data: {
        umkm_id: parseInt(id),
        photo_url: fileUrl,
        description: caption,
        required_funds: amount,
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
