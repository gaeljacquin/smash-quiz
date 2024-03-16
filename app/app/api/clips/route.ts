import { NextResponse } from 'next/server';

import prisma from '~/prisma/client';
import type { Clip } from '@/interfaces/clip';

export async function GET() {
  try {
    const data: Array<Clip> = await prisma.$queryRaw`
      SELECT
        c.id,
        c.timer,
        c.youtube_id,
        array_agg(a.smash_id) as fighters
      FROM clip c
      JOIN answer a ON c.id = a.clip_id
      GROUP BY c.id;
    `;

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message, status: 500 });
  }
}
