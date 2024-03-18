import { Controller, Post, Body } from '@nestjs/common';
import { GameLogsDto } from '~/src/gamelogs/gamelogs.dto';
import { PrismaService } from '~/prisma/prisma.service';

@Controller('log')
export class GameLogsController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async create(@Body() gamelogsDto: GameLogsDto) {
    gamelogsDto.played = new Date(gamelogsDto.played);

    const createdGameLog = await this.prisma.logs.create({
      data: gamelogsDto,
    });

    return { message: 'Game logged! 😀', createdGameLog };
  }
}
