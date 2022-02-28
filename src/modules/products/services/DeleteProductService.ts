import redisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ProductsRepository from '../typeorm/repositories/ProductsRepository';

interface IRequest {
    id: string;
}

class DeleteProductService {
    public async execute({ id }: IRequest): Promise<void> {
        const productsRepository = getCustomRepository(ProductsRepository);

        const product = await productsRepository.findOne(id);

        if (!product) {
            throw new AppError('Product not found');
        }

        await productsRepository.remove(product);

        await redisCache.invalidate('api-vendas-PRODUCT-LIST');
    }
}

export default DeleteProductService;
