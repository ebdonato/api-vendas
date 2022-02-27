import { Request, Response } from 'express';
import CreateOrderService from '../services/CreateOrderService';
import ShowOrderService from '../services/ShowOrderService';

export default class OrdersController {
    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const service = new ShowOrderService();

        const order = await service.execute({ id });

        return response.json(order);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { costumer_id, products } = request.body;

        const service = new CreateOrderService();

        const order = await service.execute({
            costumer_id,
            products,
        });

        return response.json(order);
    }
}
