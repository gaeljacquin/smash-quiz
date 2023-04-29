import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClipsService } from './clips.service';
import { ClipsController } from './clips.controller';
import { Clip, ClipSchema } from 'src/schemas/clip.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Clip.name, schema: ClipSchema }])],
  controllers: [ClipsController],
  providers: [ClipsService]
})
export class ClipsModule {}
