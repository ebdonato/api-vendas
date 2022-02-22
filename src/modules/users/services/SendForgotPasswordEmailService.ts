import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import EtherealMail from '@config/mail/EtherealMail';
import path from 'path';

interface IRequest {
    email: string;
}

class SendForgotPasswordEmailService {
    public async execute({ email }: IRequest): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository);
        const userTokensRepository = getCustomRepository(UserTokensRepository);

        const userExists = await usersRepository.findByEmail(email);

        if (!userExists) {
            throw new AppError('User does not exists.');
        }

        const { token } = await userTokensRepository.generate(userExists.id);

        const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');

        await EtherealMail.sendMail({
            to: {
                name: userExists.name,
                email: userExists.email,
            },
            subject: 'Change password request',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: userExists.name,
                    link: `http://url/reset_password?token=${token}`,
                },
            },
        });
    }
}

export default SendForgotPasswordEmailService;