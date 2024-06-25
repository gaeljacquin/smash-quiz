import { Injectable } from '@nestjs/common';
import { clip, fighter } from '@prisma/client';
import { PrismaService } from '~/src/services/prisma.service';

@Injectable()
export class DbService {
  constructor(private readonly prisma: PrismaService) {}

  async saveLog(data: any): Promise<void> {
    await this.prisma.logs.create({
      data,
    });
  }

  async getClips(): Promise<Array<clip>> {
    const data: Array<clip> = await this.prisma.$queryRaw`
      SELECT
        c.id,
        c.clip_name,
        c.timer,
        c.youtube_id,
        array_agg(a.smash_id) as fighters
      FROM
        clip c
      JOIN
        answer a ON c.id = a.clip_id
      GROUP BY
        c.id
      ;
    `;

    return data;
  }

  async getFighters(): Promise<Array<fighter>> {
    const characterImagePath = `${process.env.SUPABASE_URL}${process.env.SUPABASE_BUCKET_PATH}${process.env.SUPABASE_SSBU_ROSTER_BUCKET}`;
    const data: Array<fighter> = await this.prisma.$queryRaw`
      SELECT
        f.smash_id,
        f.simple_name,
        f.name_en_us,
        ${characterImagePath} || simple_name || '/chara_0_' || f.simple_name || '_00.png' AS partial_img,
        ${characterImagePath} || simple_name || '/chara_5_' || f.simple_name || '_00.png' AS full_img
      FROM
        fighter f
      ;
    `;

    return data;
  }
}
