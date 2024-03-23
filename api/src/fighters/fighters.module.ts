import { Module } from '@nestjs/common';
import { FightersService } from '~/src/fighters/fighters.service';
import { FightersController } from '~/src/fighters/fighters.controller';
import { RedisService } from '~/src/redis/redis.service';
import { RedisRepository } from '~/src/redis/redis.repository';
import { DbService } from '~/src/services/db.service';
import { RedisClientFactory } from '~/src/redis/redis-client.factory';
import { PrismaService } from '~/src/services/prisma.service';

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
