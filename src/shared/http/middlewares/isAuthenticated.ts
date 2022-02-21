import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

export default function isAuthenticated(request: Request, response: Response, next: NextFunction): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('JWT Token is missing');
    }

    const [, token] = authHeader.split(' ');

    try {
        const decodeToken = verify(token, authConfig.jwt.secret);

        const { sub } = decodeToken as JwtPayload;

        request.user = {
            id: sub as string,
        };

        return next();
    } catch (error) {
        throw new AppError('Invalid JWT Token');
    }
}
