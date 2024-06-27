import { Module } from '@nestjs/common';
import { ClipsService } from '~/src/clips/clips.service';
import { ClipsController } from '~/src/clips/clips.controller';
import { RedisService } from '~/redis/redis.service';
import { RedisRepository } from '~/redis/redis.repository';
import { DbService } from '~/services/db.service';
import { RedisClientFactory } from '~/redis/redis-client.factory';
import { PrismaService } from '~/services/prisma.service';

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
