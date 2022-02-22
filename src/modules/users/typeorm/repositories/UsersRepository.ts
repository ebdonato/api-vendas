import { EntityRepository, Repository } from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
    public async findByName(name: string): Promise<User | undefined> {
        return this.findOne({ name });
    }

    public async findById(id: string): Promise<User | undefined> {
        return this.findOne({ id });
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        return this.findOne({ email });
    }
}