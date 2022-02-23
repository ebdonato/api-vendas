import { Router } from 'express';
import CostumersController from '../controllers/CostumersController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const costumersRouter = Router();
const costumersController = new CostumersController();

const bodySchema = {
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().required(),
    },
};

const paramsSchema = {
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
    },
};

costumersRouter.use(isAuthenticated);

costumersRouter.get('/', costumersController.index);

costumersRouter.get('/:id', celebrate({ ...paramsSchema }), costumersController.show);

costumersRouter.post('/', celebrate({ ...bodySchema }), costumersController.create);

costumersRouter.put('/:id', celebrate({ ...paramsSchema, ...bodySchema }), costumersController.update);

costumersRouter.delete('/:id', celebrate({ ...paramsSchema }), costumersController.delete);

export default costumersRouter;
