import { Module } from '@nestjs/common';
import { FighterService } from '~/src/fighter/fighter.service';
import { FighterController } from '~/src/fighter/fighter.controller';
import { PrismaService } from '~/src/prisma/prisma.service';

@Module({
  providers: [FighterService, PrismaService],
  controllers: [FighterController],
})
export class FighterModule {}
