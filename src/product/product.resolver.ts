import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Product } from './entity/product.entity';
import { ProductService } from './product.service';
import { ILike } from 'typeorm';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Product])
  async products(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @Query(() => Product)
  async findProductById(@Args('id') id: string): Promise<Product> {
    return await this.productService.findOne(id);
  }

  @Query(() => [Product])
  async findProductByName(@Args('name') name: string): Promise<Product[]> {
    return await this.productService.findByName(name);
  }

  @Mutation(() => Product)
  async createProduct(
    @Args('name') name: string,
    @Args('description', { nullable: true }) description: string,
    @Args('price') price: number,
  ): Promise<Product> {
    const product = new Product();
    product.name = name;
    product.description = description;
    product.price = price;
    return await this.productService.create(product);
  }
}
