import { EntityRepository, Repository } from 'typeorm';
import Costumer from '../entities/Costumer';

@EntityRepository(Costumer)
export default class CostumerRepository extends Repository<Costumer> {
    public async findByName(name: string): Promise<Costumer | undefined> {
        return await this.findOne({ name });
    }

    public async findById(id: string): Promise<Costumer | undefined> {
        return await this.findOne({ id });
    }

    public async findByEmail(email: string): Promise<Costumer | undefined> {
        return await this.findOne({ email });
    }
}
