import Costumer from '@modules/costumers/typeorm/entities/Costumer';
import { EntityRepository, Repository } from 'typeorm';
import Order from '../entities/Order';

interface IProduct {
    product_id: string;
    price: number;
    quantity: number;
}

interface IRequest {
    costumer: Costumer;
    products: IProduct[];
}

@EntityRepository(Order)
export default class OrderRepository extends Repository<Order> {
    public async findById(id: string): Promise<Order | undefined> {
        return await this.findOne(
            { id },
            {
                relations: ['order_products', 'costumer'],
            },
        );
    }

    public async createOrder({ costumer, products }: IRequest): Promise<Order> {
        const order = this.create({
            costumer,
            order_products: products,
        });

        await this.save(order);

        return order;
    }
}
