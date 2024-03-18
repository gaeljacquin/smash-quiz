import { Module } from '@nestjs/common';
import { AppController } from '~/src/app.controller';
import { AppService } from '~/src/app.service';
import { ConfigModule } from '@nestjs/config';
import { GameLogController } from '~/src/gamelog/gamelog.controller';
import { redisClientFactory } from '~/src/redis/redis-client.factory';
import { RedisRepository } from '~/src/redis/redis.repository';
import { RedisService } from '~/src/redis/redis.service';
// import { PrismaService } from '~/src/services/prisma.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, GameLogController],
  providers: [
    AppService,
    redisClientFactory,
    RedisRepository,
    RedisService,
    AppController,
  ],
})
export class AppModule {}
