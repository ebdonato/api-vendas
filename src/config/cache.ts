import { RedisOptions } from 'ioredis';

const cacheConfig: RedisOptions = {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASS || undefined,
};

export default cacheConfig;
