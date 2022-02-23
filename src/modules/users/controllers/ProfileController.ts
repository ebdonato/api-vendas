import { Request, Response } from 'express';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';

export default class ProfileController {
    public async show(request: Request, response: Response): Promise<Response> {
        const service = new ShowProfileService();

        const user_id = request.user.id;

        const user = await service.execute({ user_id });

        return response.json(user);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;

        const { name, email, password, old_password } = request.body;

        const service = new UpdateProfileService();

        const user = await service.execute({ user_id, name, email, password, old_password });

        return response.json(user);
    }
}