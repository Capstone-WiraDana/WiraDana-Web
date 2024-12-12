import { uploadPhoto } from '@/lib/actionUpload';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { message: 'No file provided' },
        { status: 400 },
      );
    }

    const timestamp = Date.now();
    const extension = file.name.split('.').pop();
    const newFileName = `${timestamp}.${extension}`;

    const success = await uploadPhoto(form, newFileName);
    if (success) {
      const fileUrl = `https://storage.googleapis.com/${process.env.GCP_BUCKET_NAME}/uploads/users/${newFileName}`;

      const url = new URL(req.url);
      const userId = url.pathname.split('/').pop();
      const intId = Number(userId);

      if (!userId) {
        return NextResponse.json(
          { message: 'User ID is required' },
          { status: 400 },
        );
      }

      await prisma.investor.update({
        where: {
          user_id: intId,
        },
        data: {
          photo_url: fileUrl,
        },
      });

      return NextResponse.json({
        message: 'File uploaded successfully',
        fileUrl,
      });
    } else {
      return NextResponse.json(
        { message: 'Failed to upload file' },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { message: 'Error uploading file', error },
      { status: 500 },
    );
  }
}
