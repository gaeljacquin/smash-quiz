import { type NextRequest, NextResponse } from 'next/server';

import prisma from '~/prisma/client';

interface RequestBody {
 exclude?: string;
}

export async function POST(req: NextRequest) {
  const request = await req.json() as RequestBody;
  const exclude = request?.exclude ? parseInt(request.exclude, 10) : 0;

  try {
    const data: Array<unknown> = await prisma.$queryRaw`
      SELECT
        c.id,
        c.timer,
        c.youtube_id,
        -- ${process.env.NEXT_YOUTUBE_VIDEO_URL} || c.youtube_id AS link,
        array_agg(a.smash_id) as fighters
      FROM clip c
      JOIN answer a ON c.id = a.clip_id
      WHERE c.id NOT IN (${exclude})
      GROUP BY c.id
      ORDER BY RANDOM()
      LIMIT 1;
    `;

    return NextResponse.json(data[0]);
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message, status: 500 });
  }
}
