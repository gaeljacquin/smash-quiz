import { Module } from '@nestjs/common';
import { AppController } from '~/src/app.controller';
import { AppService } from '~/src/app.service';
import { FighterModule } from '~/src/fighter/fighter.module';
import { ClipModule } from '~/src/clip/clip.module';
import { PrismaService } from '~/src/prisma/prisma.service';

@Module({
  imports: [FighterModule, ClipModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
