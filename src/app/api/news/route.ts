import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import serializeBigInt from '@/hooks/use-serialize';
import { StoryPayload } from '@/types/news';

export const GET = async (req: NextRequest) => {
  const method = req.method;
  const id = req.nextUrl.searchParams.get('id');

  if (method !== 'GET') {
    return NextResponse.json(
      {
        status: 'gagal',
        message: 'Method yang digunakan salah',
      },
      { status: 405 },
    );
  }

  try {
    const invId: number = Number(id);
    const newsData = await prisma.$queryRaw`
SELECT 
    s.id AS story_id, 
    s.umkm_id, 
    u.logo_url, 
    u.umkm_name, 
    s.photo_url, 
    s.caption, 
    COALESCE(COUNT(DISTINCT ls.id), 0) AS likes_count, 
    COALESCE(COUNT(DISTINCT sc.id), 0) AS comments_count,
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM likes_story WHERE story_id = s.id AND investor_id = ${invId}
        ) THEN TRUE
        ELSE FALSE
    END AS isLiked
FROM umkm u
LEFT JOIN story s ON u.user_id = s.umkm_id
LEFT JOIN likes_story ls ON s.id = ls.story_id
LEFT JOIN story_comments sc ON s.id = sc.story_id
WHERE s.id IS NOT NULL
GROUP BY 
    s.id, 
    s.umkm_id, 
    u.logo_url, 
    u.umkm_name, 
    s.photo_url, 
    s.caption;

    `;

    const serializedData = serializeBigInt(newsData);

    return NextResponse.json(
      {
        status: 'berhasil',
        message: 'Data berita berhasil didapatkan',
        data: serializedData,
      },
      {
        status: 200,
      },
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

export const POST = async (req: NextRequest) => {
  const body: StoryPayload | null = await req.json().catch(() => null);
  try {
    if (!body || !body.investor_id || !body.story_id) {
      return NextResponse.json(
        {
          status: 'gagal',
          message: 'id investor atau berita kosong',
        },
        { status: 400 },
      );
    }

    const { story_id, investor_id } = body;

    await prisma.likesStory.create({
      data: {
        story_id: Number(story_id),
        investor_id: Number(investor_id),
      },
    });

    return NextResponse.json(
      {
        status: 'berhasil',
      },
      {
        status: 200,
      },
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

export const DELETE = async (req: NextRequest) => {
  const body: StoryPayload | null = await req.json().catch(() => null);
  try {
    if (!body || !body.investor_id || !body.story_id) {
      return NextResponse.json(
        {
          status: 'gagal',
          message: 'id investor atau berita kosong',
        },
        { status: 400 },
      );
    }

    const { story_id, investor_id } = body;

    await prisma.$queryRaw`
    DELETE FROM likes_story WHERE investor_id = ${investor_id} AND story_id = ${story_id}
    `;

    return NextResponse.json(
      {
        status: 'berhasil',
      },
      {
        status: 200,
      },
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
