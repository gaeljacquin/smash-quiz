import { Injectable } from '@nestjs/common';
import { connect } from 'amqplib';

@Injectable()
export class RabbitMQProducerService {
  async sendToQueue(data: any) {
    const connection = await connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    const queue = process.env.RABBITMQ_QUEUE;
    data.played = new Date(data.played).toISOString();

    await channel.assertQueue(queue, { durable: true });
    await channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));

    console.log(' [x] Sent %s', data);
  }
}
