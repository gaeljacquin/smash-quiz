import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RabbitMQConsumerService } from '~/src/rabbitmq/rmq-consumer.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const queueListenerService = app.get(RabbitMQConsumerService);
  queueListenerService.listenToQueue();

  // app.enableCors({
  //   origin: function (origin, callback) {
  //     if (origin === process.env.CLIENT_URL) {
  //       console.log('yes');
  //       callback(null, true);
  //     } else {
  //       console.log('no');
  //       callback(new Error('Not allowed by CORS'));
  //     }
  //   },
  //   methods: 'GET,POST',
  //   credentials: false,
  // });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
