import { Injectable } from '@nestjs/common';
import { RedisRepository } from '~/src/redis/redis.repository';
import { DbService } from '~/src/services/db.service';

@Injectable()
export class RedisService {
  constructor(
    private readonly redisRepository: RedisRepository,
    private readonly dbService: DbService,
  ) {}

  async saveData(key: string, data: any): Promise<void> {
    await this.redisRepository.set(key, JSON.stringify(data));
  }

  async getData(key: string): Promise<any | null> {
    const data = await this.redisRepository.get(key);
    return data ? JSON.parse(data) : null;
  }

  async saveLogAsHash(data: any): Promise<void> {
    const key = `gamelog:${Date.now()}`;
    const hashData = Object.entries(data).flat();
    await this.redisRepository.hmset(key, hashData);
  }

  async getClips(): Promise<any | null> {
    const key = 'allClips';
    let clips = await this.redisRepository.get(key);

    if (!clips) {
      clips = JSON.stringify(await this.dbService.getClips());
      await this.saveData(key, clips);
    }

    return clips ? JSON.parse(clips) : null;
  }

  async getFighters(): Promise<any | null> {
    const key = 'allFighters';
    let fighters = await this.redisRepository.get(key);

    if (!fighters) {
      fighters = JSON.stringify(await this.dbService.getFighters());
      await this.saveData(key, fighters);
    }

    return fighters ? JSON.parse(fighters) : null;
  }
}
