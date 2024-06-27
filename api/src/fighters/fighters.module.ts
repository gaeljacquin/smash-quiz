import { Module } from '@nestjs/common';
import { FightersService } from '~/src/fighters/fighters.service';
import { FightersController } from '~/src/fighters/fighters.controller';
import { RedisService } from '~/redis/redis.service';
import { RedisRepository } from '~/redis/redis.repository';
import { DbService } from '~/services/db.service';
import { RedisClientFactory } from '~/redis/redis-client.factory';
import { PrismaService } from '~/services/prisma.service';

@Module({
  controllers: [FightersController],
  providers: [
    FightersService,
    RedisService,
    RedisRepository,
    DbService,
    RedisClientFactory,
    PrismaService,
  ],
})
export class FightersModule {}
