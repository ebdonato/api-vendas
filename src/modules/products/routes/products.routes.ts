import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';
import { celebrate, Joi, Segments } from 'celebrate';

const productsRouter = Router();
const productsController = new ProductsController();

const bodySchema = {
    [Segments.BODY]: {
        name: Joi.string().required(),
        price: Joi.number().precision(2).required(),
        quantity: Joi.number().required(),
    },
};

const paramsSchema = {
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
    },
};

productsRouter.get('/', productsController.index);

productsRouter.get('/:id', celebrate({ ...paramsSchema }), productsController.show);

productsRouter.post('/', celebrate({ ...bodySchema }), productsController.create);

productsRouter.put('/:id', celebrate({ ...paramsSchema, ...bodySchema }), productsController.update);

productsRouter.delete('/:id', celebrate({ ...paramsSchema }), productsController.delete);

export default productsRouter;
