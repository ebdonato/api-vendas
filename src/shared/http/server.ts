import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';
import { errors } from 'celebrate';
import { uploadDirectory } from '@config/upload';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/files', express.static(uploadDirectory));

app.use(routes);

app.use(errors());

//é necessário o último argumento não suado para a assinatura da função ser a correta
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: Error, _: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: 'Error',
            message: error.message,
        });
    }

    return response.status(500).json({
        status: 'Error',
        message: 'Internal Server Error',
    });
});

app.listen(3333, () => {
    // eslint-disable-next-line no-console
    console.log('Server start on port 3333 🏆');
});
