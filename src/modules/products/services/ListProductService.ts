import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductsRepository from '../typeorm/repositories/ProductsRepository';
import redisCache from '@shared/cache/RedisCache';

class ListProductService {
    private async findFromRepository(): Promise<Product[]> {
        const productsRepository = getCustomRepository(ProductsRepository);

        const products = await productsRepository.find();

        await redisCache.save('api-vendas-PRODUCT-LIST', products);

        return products;
    }

    public async execute(): Promise<Product[]> {
        const products =
            (await redisCache.recover<Product[]>('api-vendas-PRODUCT-LIST')) ?? (await this.findFromRepository());

        return products;
    }
}

export default ListProductService;
