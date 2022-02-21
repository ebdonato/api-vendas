import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import multer from 'multer';
import uploadConfig from '@config/upload';

const upload = multer(uploadConfig);

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const bodySchema = {
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    },
};

usersRouter.get('/', isAuthenticated, usersController.index);

usersRouter.post('/', celebrate({ ...bodySchema }), usersController.create);

usersRouter.patch('/avatar', isAuthenticated, upload.single('avatar'), userAvatarController.update);

export default usersRouter;
