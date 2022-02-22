import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs';

interface IRequest {
    token: string;
    password: string;
}

const ELAPSED_HOURS = 2;

class ResetPasswordService {
    public async execute({ token, password }: IRequest): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository);
        const userTokensRepository = getCustomRepository(UserTokensRepository);

        const userToken = await userTokensRepository.findByToken(token);

        if (!userToken) {
            throw new AppError('Unknown token.');
        }

        const userExists = await usersRepository.findById(userToken.user_id);

        if (!userExists) {
            throw new AppError('User does not exists.');
        }

        const tokenCreatedAt = userToken.created_at;

        const compareDate = addHours(tokenCreatedAt, ELAPSED_HOURS);

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError('Expired token.');
        }

        userExists.password = await hash(password, 8);

        await usersRepository.save(userExists);

        //TODO delete used user token after successful change password
    }
}

export default ResetPasswordService;
