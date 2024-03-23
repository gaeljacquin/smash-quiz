import { Module } from '@nestjs/common';
import { AppController } from '~/src/app.controller';
import { AppService } from '~/src/app.service';
import { ConfigModule } from '@nestjs/config';
import { GameLogController } from '~/src/gamelog/gamelog.controller';
import { RedisClientFactory } from '~/src/redis/redis-client.factory';
import { RedisPubSubService } from '~/src/redis/redis-pubsub.service';
import { RabbitMQConsumerService } from '~/src/rabbitmq/rmq-consumer.service';
import { RabbitMQProducerService } from '~/src/rabbitmq/rmq-producer.service';
import { DbService } from '~/src/services/db.service';
import { PrismaService } from '~/src/services/prisma.service';
import { RedisService } from '~/src/redis/redis.service';
import { RedisRepository } from '~/src/redis/redis.repository';
import { GameLogsService } from '~/src/gamelog/gamelog.service';
import { FightersModule } from '~/src/fighters/fighters.module';
import { ClipsModule } from '~/src/clips/clips.module';
import { ClipsController } from '~/src/clips/clips.controller';
import { ClipsService } from '~/src/clips/clips.service';
import { FightersService } from './fighters/fighters.service';
import { FightersController } from './fighters/fighters.controller';

@Module({
  imports: [ConfigModule.forRoot(), FightersModule, ClipsModule],
  controllers: [
    AppController,
    GameLogController,
    FightersController,
    ClipsController,
  ],
  providers: [
    AppService,
    RedisClientFactory,
    RedisPubSubService,
    DbService,
    RedisService,
    RedisRepository,
    RabbitMQProducerService,
    RabbitMQConsumerService,
    PrismaService,
    GameLogsService,
    FightersService,
    ClipsService,
    AppController,
  ],
})
export class AppModule {}
