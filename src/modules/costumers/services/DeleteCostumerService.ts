import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import CostumersRepository from '../typeorm/repositories/CostumersRepository';

interface IRequest {
    id: string;
}

class DeleteCostumerService {
    public async execute({ id }: IRequest): Promise<void> {
        const costumersRepository = getCustomRepository(CostumersRepository);

        const costumer = await costumersRepository.findById(id);

        if (!costumer) {
            throw new AppError('Costumer not found.');
        }

        await costumersRepository.remove(costumer);
    }
}

export default DeleteCostumerService;
