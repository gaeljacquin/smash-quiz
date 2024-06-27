import { Injectable } from '@nestjs/common';
import { RedisPubSubService } from '~/redis/redis-pubsub.service';
import { DbService } from '~/services/db.service';

@Injectable()
export class GameLogsService {
  constructor(
    private readonly redisPubSubService: RedisPubSubService,
    private readonly dbService: DbService,
  ) {}

  onModuleInit(): void {
    this.redisPubSubService.subscribe(
      process.env.REDIS_CHANNEL,
      async (message) => {
        const data = JSON.parse(message);
        await this.dbService.saveLog(data);
      },
    );
  }
}
