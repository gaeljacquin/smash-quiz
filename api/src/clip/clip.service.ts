import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '~/src/prisma/prisma.service';

@Injectable()
export class ClipService {
  constructor(private prisma: PrismaService) {}

  async findRandom(exclude = 0) {
    exclude = Number(exclude);
    // TODO: turn exclude into a list of numbers

    const result = await this.prisma.$queryRaw(
      Prisma.sql`
        SELECT c.id, c.video_name, c.timer, array_agg(a.smash_id) as fighters
        FROM clip c
        JOIN answer a ON c.id = a.clip_id
        WHERE c.id NOT IN (${exclude})
        GROUP BY c.id
        ORDER BY RANDOM()
        LIMIT 1;
      `,
    );

    return result;
  }
}
