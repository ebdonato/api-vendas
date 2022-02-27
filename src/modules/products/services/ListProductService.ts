import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductsRepository from '../typeorm/repositories/ProductsRepository';
import RedisCache from '@shared/cache/RedisCache';

class ListProductService {
    private async findFromRepository(cache: RedisCache): Promise<Product[]> {
        const productsRepository = getCustomRepository(ProductsRepository);

        const products = await productsRepository.find();

        await cache.save('api-vendas-PRODUCT-LIST', products);

        return products;
    }

    public async execute(): Promise<Product[]> {
        const redisCache = new RedisCache();

        const products =
            (await redisCache.recover<Product[]>('api-vendas-PRODUCT-LIST')) ??
            (await this.findFromRepository(redisCache));

        return products;
    }
}

export default ListProductService;
