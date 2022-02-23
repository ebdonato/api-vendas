import { Request, Response } from 'express';
import CreateCostumerService from '../services/CreateCostumerService';
import DeleteCostumerService from '../services/DeleteCostumerService';
import ListCostumerService from '../services/ListCostumerService';
import ShowCostumerService from '../services/ShowCostumerService';
import UpdateCostumerService from '../services/UpdateCostumerService';

export default class CostumersController {
    public async index(request: Request, response: Response): Promise<Response> {
        const service = new ListCostumerService();

        const costumers = await service.execute();

        return response.json(costumers);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const service = new ShowCostumerService();

        const costumer = await service.execute({ id });

        return response.json(costumer);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { name, email } = request.body;

        const service = new CreateCostumerService();

        const costumer = await service.execute({ name, email });

        return response.json(costumer);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { name, email } = request.body;

        const service = new UpdateCostumerService();

        const costumer = await service.execute({ id, name, email });

        return response.json(costumer);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const service = new DeleteCostumerService();

        await service.execute({ id });

        return response.json([]);
    }
}
