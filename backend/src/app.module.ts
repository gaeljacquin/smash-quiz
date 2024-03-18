import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GameLogsController } from '~/src/gamelogs/gamelogs.controller';
import { PrismaService } from '~/prisma/prisma.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, GameLogsController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
