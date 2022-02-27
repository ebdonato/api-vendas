import { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';
import cacheConfig from '@config/cache';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import AppError from '@shared/errors/AppError';

const storeClient = new Redis(cacheConfig);

const limiter = new RateLimiterRedis({
    storeClient,
    keyPrefix: 'ratelimit',
    points: 5,
    duration: 1,
});

export default async function rateLimiter(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
        await limiter.consume(request.ip);

        return next();
    } catch (error) {
        throw new AppError('Too many requests.', 429);
    }
}
