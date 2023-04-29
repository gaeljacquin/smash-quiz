import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FightersService } from './fighters.service';
import { FightersController } from './fighters.controller';
import { Fighter, FighterSchema } from 'src/schemas/fighter.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Fighter.name, schema: FighterSchema }])],
  controllers: [FightersController],
  providers: [FightersService]
})
export class FightersModule {}
