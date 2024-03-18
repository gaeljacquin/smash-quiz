import { Controller, Post, Body } from '@nestjs/common';
import { GameLogDto } from '~/src/gamelog/gamelog.dto';
import { RedisService } from '~/src/redis/redis.service';

@Controller('log')
export class GameLogController {
  constructor(private readonly redisService: RedisService) {}

  @Post()
  async create(@Body() gamelogDto: GameLogDto) {
    gamelogDto.played = new Date(gamelogDto.played);

    const key = `gamelog:${Date.now()}`;
    const createdGameLog = await this.redisService.saveDataAsHash(
      key,
      gamelogDto,
    );

    return { message: 'Game logged! 😀', createdGameLog };
  }
}
