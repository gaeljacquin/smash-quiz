import { Module } from '@nestjs/common';
import { AppController } from '~/src/app.controller';
import { AppService } from '~/src/app.service';
import { ConfigModule } from '@nestjs/config';
import { GameLogController } from '~/src/gamelog/gamelog.controller';
import { redisClientFactory } from '~/src/redis/redis-client.factory';
import { RedisRepository } from '~/src/redis/redis.repository';
import { RedisService } from '~/src/redis/redis.service';
import { RabbitMQConsumerService } from '~/src/rabbitmq/rmq-consumer.service';
import { RabbitMQProducerService } from '~/src/rabbitmq/rmq-producer.service';
// import { PrismaService } from '~/src/services/prisma.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, GameLogController],
  providers: [
    AppService,
    redisClientFactory,
    RedisRepository,
    RedisService,
    RabbitMQProducerService,
    RabbitMQConsumerService,
    AppController,
  ],
})
export class AppModule {}
