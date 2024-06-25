import { Module } from '@nestjs/common';
import { ClipsService } from '~/src/clips/clips.service';
import { ClipsController } from '~/src/clips/clips.controller';
import { RedisService } from '~/src/redis/redis.service';
import { RedisRepository } from '~/src/redis/redis.repository';
import { DbService } from '~/src/services/db.service';
import { RedisClientFactory } from '~/src/redis/redis-client.factory';
import { PrismaService } from '~/src/services/prisma.service';

@Module({
  controllers: [ClipsController],
  providers: [
    ClipsService,
    RedisService,
    RedisRepository,
    DbService,
    RedisClientFactory,
    PrismaService,
  ],
})
export class ClipsModule {}
