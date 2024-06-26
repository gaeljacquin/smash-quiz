import { Controller, Post, Body } from '@nestjs/common';
import { GameLogDto } from '~/src/gamelog/gamelog.dto';
import { RabbitMQProducerService } from '~/rabbitmq/rmq-producer.service';

@Controller('log')
export class GameLogController {
  constructor(
    private readonly rabbitMQProducerService: RabbitMQProducerService,
  ) {}

  @Post()
  async create(@Body() gamelogDto: GameLogDto) {
    const gameLog = await this.rabbitMQProducerService.sendToQueue(gamelogDto);

    return { message: 'Game log added to queue! 😀', gameLog };
  }
}
