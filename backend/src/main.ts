import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RabbitMQConsumerService } from '~/src/rabbitmq/rmq-consumer.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const queueListenerService = app.get(RabbitMQConsumerService);
  queueListenerService.listenToQueue();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
