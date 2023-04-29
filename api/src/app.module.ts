import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from 'configuration/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FightersModule } from './fighters/fighters.module';
import { ClipsModule } from './clips/clips.module';

@Module({
  imports: [
    FightersModule,
    ClipsModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
