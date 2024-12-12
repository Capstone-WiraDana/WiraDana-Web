import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import serializeBigInt from '@/hooks/use-serialize';

export const GET = async (req: NextRequest) => {
  const story_id = req.nextUrl.searchParams.get('id');
  try {
    const storyData = await prisma.$queryRaw`
    SELECT 
    s.id,
    u.user_id as umkm_id,
    u.logo_url, 
    u.umkm_name, 
    s.photo_url, 
    s.caption
  FROM umkm u
  LEFT JOIN story s ON u.user_id = s.umkm_id
  WHERE s.id = ${Number(story_id)} LIMIT 1
    `;

    const commentData = await prisma.$queryRaw`
    SELECT i.photo_url, i.username, sc.comment, sc."createdAt"
    FROM story_comments sc LEFT JOIN investor i ON
    sc.investor_id = i.user_id WHERE sc.story_id = ${Number(story_id)} ORDER BY sc."createdAt" DESC;
    `;

    const serializedStory = await serializeBigInt(storyData);
    const serializedComment = await serializeBigInt(commentData);

    return NextResponse.json({
      status: 'berhasil',
      data: {
        story: serializedStory,
        comment: serializedComment,
      },
    });
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
