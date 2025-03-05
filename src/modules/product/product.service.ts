import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(name: string, identification: string): Promise<Product> {
    const newProduct = this.productRepository.create({
      name,
      identification,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return this.productRepository.save(newProduct);
  }

  async getAll() {
    return this.productRepository.find();
  }

  async update(
    id: number,
    updatedData: { name: string; identification: string },
  ): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const updatedProduct = this.productRepository.merge(product, {
      ...updatedData,
      updated_at: new Date(),
    });

    return this.productRepository.save(updatedProduct);
  }

  async delete(id: number) {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    await this.productRepository.remove(product);

    return { message: 'Product deleted successfully' };
  }
}
