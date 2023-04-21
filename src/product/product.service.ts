import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Product } from './entity/product.entity';
import { ProductInput } from './product.resolver';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: string): Promise<Product> {
    return await this.productRepository.findOne({ where: { id } });
  }

  async findByName(name: string): Promise<Product[]> {
    return await this.productRepository.find({
      where: { name: ILike(`%${name}%`) },
    });
  }

  async create(product: Product): Promise<Product> {
    return await this.productRepository.save(product);
  }

  async update(id: string, productInput: ProductInput): Promise<Product> {
    const existingProduct = await this.productRepository.findOne({
      where: { id },
    });
    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    const updatedProduct = Object.assign(existingProduct, productInput);
    return await this.productRepository.save(updatedProduct);
  }

  async delete(id: string): Promise<void> {
    await this.productRepository.delete({ id });
  }
}
