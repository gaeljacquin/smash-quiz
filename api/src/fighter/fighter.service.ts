import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/src/prisma/prisma.service';

@Injectable()
export class FighterService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const fighters = await this.prisma.fighter.findMany();
    return fighters.map((fighter) => ({
      id: fighter.id,
      smash_id: fighter.smash_id,
      name_en_us: fighter.name_en_us,
      chara_0: fighter.chara_0,
    }));
  }
}
