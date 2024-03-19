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
import { PrismaService } from '~/src/prisma/prisma.service';
import { RedisService } from './redis/redis.service';
import { RedisRepository } from './redis/redis.repository';
import { GameLogsService } from './gamelog/gamelog.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, GameLogController],
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
    AppController,
  ],
})
export class AppModule {}
