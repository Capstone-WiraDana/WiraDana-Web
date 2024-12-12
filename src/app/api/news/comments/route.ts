import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { CommentPayload } from '@/types/news';

export const POST = async (req: NextRequest) => {
  const body: CommentPayload = await req.json().catch(() => null);
  try {
    if (!body || !body.id || !body.comment || !body.story_id) {
      return NextResponse.json(
        {
          status: 'gagal',
          message: 'Id atau Komentar Kosong',
        },
        { status: 400 },
      );
    }

    const { id, story_id, comment } = body;
    await prisma.storyComments.create({
      data: {
        story_id: Number(story_id),
        investor_id: Number(id),
        comment: comment,
      },
    });

    return NextResponse.json(
      {
        status: 'berhasil',
        message: 'data komentar berhasil ditambahkan',
      },
      {
        status: 200,
      },
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
