import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { connect } from 'amqplib';
import { RedisService } from '~/src/redis/redis.service';

@Injectable()
export class RabbitMQConsumerService {
  constructor(private readonly redisService: RedisService) {}

  @MessagePattern('rabbit-mq-producer')
  async listenToQueue() {
    const connection = await connect(process.env.RABBITMQ_URL); // replace with your RabbitMQ server url
    const channel = await connection.createChannel();
    const queue = process.env.RABBITMQ_QUEUE;

    await channel.assertQueue(queue, { durable: true });

    console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue);

    channel.consume(queue, async (msg) => {
      if (msg !== null) {
        try {
          console.log(' [x] Received %s', msg.content.toString());
          const data = JSON.parse(msg.content.toString());
          await this.redisService.saveDataAsHash(data);
          channel.ack(msg);
          console.log({ message: 'Game logged! 😀', data });
        } catch (error) {
          console.log({ message: error.message });
        }
      }
    });
  }
}
