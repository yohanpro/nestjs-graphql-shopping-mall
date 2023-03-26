import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Product } from './entity/product.entity';
import { ProductService } from './product.service';

@Resolver((of) => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Product])
  products(): Product[] {
    return this.productService.findAll();
  }

  @Mutation(() => Product)
  createProduct(
    @Args('name') name: string,
    @Args('description', { nullable: true }) description: string,
    @Args('price') price: number,
  ): Omit<Product, 'id'> {
    return this.productService.create({
      id: Math.random().toString(36).substring(2),
      name,
      description,
      price,
    });
  }
}
