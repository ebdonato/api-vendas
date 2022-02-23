import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Costumer from '../typeorm/entities/Costumer';
import CostumersRepository from '../typeorm/repositories/CostumersRepository';

interface IRequest {
    name: string;
    email: string;
}

class CreateCostumerService {
    public async execute({ name, email }: IRequest): Promise<Costumer> {
        const costumersRepository = getCustomRepository(CostumersRepository);

        const costumerExists = await costumersRepository.findByEmail(email);

        if (costumerExists) {
            throw new AppError('Email address already used');
        }

        const costumer = costumersRepository.create({ name, email });

        await costumersRepository.save(costumer);

        return costumer;
    }
}

export default CreateCostumerService;
