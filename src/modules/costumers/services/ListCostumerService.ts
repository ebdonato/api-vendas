import { getCustomRepository } from 'typeorm';
import Costumer from '../typeorm/entities/Costumer';
import CostumersRepository from '../typeorm/repositories/CostumersRepository';

interface IPaginateCostumer {
    from: number;
    to: number;
    per_page: number;
    total: number;
    current_page: number;
    prev_page: number | null;
    next_page: number | null;
    data: Costumer[];
}

class ListCostumerService {
    public async execute(): Promise<IPaginateCostumer> {
        const costumersRepository = getCustomRepository(CostumersRepository);

        const costumers = await costumersRepository.createQueryBuilder().paginate();

        return costumers as IPaginateCostumer;
    }
}

export default ListCostumerService;
