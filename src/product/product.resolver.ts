import {
  Args,
  Mutation,
  Query,
  Resolver,
  Field,
  InputType,
  Float,
} from '@nestjs/graphql';
import { Product } from './entity/product.entity';
import { ProductService } from './product.service';
import { NotFoundException } from '@nestjs/common';

@InputType()
export class ProductInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Float)
  price: number;
}

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
  async updateProduct(
    @Args('id') id: string,
    @Args('product') product: ProductInput,
  ): Promise<Product> {
    const existingProduct = await this.productService.findOne(id);
    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    const updatedProduct = Object.assign(existingProduct, product);
    return await this.productService.update(id, updatedProduct);
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
