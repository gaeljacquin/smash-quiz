import { NextResponse } from 'next/server';

import prisma from '~/prisma/client';

export async function GET() {
  try {
    const data: Array<unknown> = await prisma.$queryRaw`
      SELECT
        f.smash_id,
        f.simple_name,
        f.name_en_us,
        ${process.env.NEXT_CLOUDINARY_IMAGE_PATH} || '/' || f.chara_0 || '/SSBU Roster/' || f.simple_name || '/chara_0_' || f.simple_name || '_00.webp' AS partial_img,
        ${process.env.NEXT_CLOUDINARY_IMAGE_PATH} || '/' || f.chara_5 || '/SSBU Roster/' || f.simple_name || '/chara_5_' || f.simple_name || '_00.webp' AS full_img
      FROM
        fighter f
      ;
    `;

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message, status: 500 });
  }
}
