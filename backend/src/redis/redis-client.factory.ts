import { FactoryProvider } from '@nestjs/common';
import { Redis } from 'ioredis';

export const RedisClientFactory: FactoryProvider<Redis> = {
  provide: 'RedisClient',
  useFactory: () => {
    const redisOptions = {
      host: process.env.REDIS_HOST || '',
      port: +process.env.REDIS_PORT,
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD || '',
    };

    if (process.env.NODE_ENV === 'development') {
      Object.assign(redisOptions, { tls: {} });
    }

    const redisInstance = new Redis(redisOptions);

    redisInstance.on('error', (e) => {
      console.dir(redisInstance);
      throw new Error(`Redis connection failed: ${e}`);
    });

    return redisInstance;
  },
  inject: [],
};
