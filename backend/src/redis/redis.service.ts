import { Injectable } from '@nestjs/common';
import { RedisRepository } from '~/src/redis/redis.repository';

@Injectable()
export class RedisService {
  constructor(private readonly redisRepository: RedisRepository) {}

  async saveData(key: string, data: any): Promise<void> {
    await this.redisRepository.set(key, JSON.stringify(data));
  }

  async getData(key: string): Promise<any | null> {
    const data = await this.redisRepository.get(key);
    return data ? JSON.parse(data) : null;
  }

  async saveDataAsHash(data: any): Promise<void> {
    const key = `gamelog:${Date.now()}`;
    const hashData = Object.entries(data).flat();
    await this.redisRepository.hmset(key, hashData);
  }
}
