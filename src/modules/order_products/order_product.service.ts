import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/order';
import { OrderProduct } from 'src/entities/order_product';
import { Repository } from 'typeorm';

@Injectable()
export class OrderProductService {
  constructor(
    @InjectRepository(Order)
    private readonly orderProductRepository: Repository<OrderProduct>,
  ) {}

  async addProductsInBulk(
    productsData: Partial<OrderProduct>[],
  ): Promise<OrderProduct[]> {
    if (!productsData || productsData.length === 0) {
      throw new NotFoundException('No product was supplied for insertion.');
    }

    const orderProducts = productsData.map((productData) =>
      this.orderProductRepository.create(productData),
    );

    return await this.orderProductRepository.save(orderProducts);
  }
}
