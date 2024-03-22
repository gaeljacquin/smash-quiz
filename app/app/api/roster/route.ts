import { NextResponse } from 'next/server';

import prisma from '~/prisma/client';

export async function GET() {
  try {
    const data: Array<unknown> = await prisma.$queryRaw`
      SELECT
        f.smash_id,
        f.simple_name,
        f.name_en_us,
        ${process.env.characterImagePath} || simple_name || '/chara_0_' || f.simple_name || '_00.png' AS partial_img,
        ${process.env.characterImagePath} || simple_name || '/chara_5_' || f.simple_name || '_00.png' AS full_img
      FROM
        fighter f
      ;
    `;

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message, status: 500 });
  }
}
