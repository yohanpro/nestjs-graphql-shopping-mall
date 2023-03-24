import { Injectable } from '@nestjs/common';
import { Product } from './entity/product.entity';

@Injectable()
export class ProductService {
  private products: Product[] = [];

  findAll(): Product[] {
    return this.products;
  }

  create(product): Product {
    this.products.push(product);
    return product;
  }
}
