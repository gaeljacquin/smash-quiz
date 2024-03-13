import { Module } from '@nestjs/common';
import { ClipService } from '~/src/clip/clip.service';
import { ClipController } from '~/src/clip/clip.controller';
import { PrismaService } from '~/src/prisma/prisma.service';

@Module({
  providers: [ClipService, PrismaService],
  controllers: [ClipController],
})
export class ClipModule {}
