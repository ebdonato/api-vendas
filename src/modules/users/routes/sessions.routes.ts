import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';

import { celebrate, Joi, Segments } from 'celebrate';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

const bodySchema = {
    [Segments.BODY]: {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    },
};

sessionsRouter.post('/', celebrate({ ...bodySchema }), sessionsController.create);

export default sessionsRouter;
