import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/entities/client';
import { Order } from 'src/entities/order';
import { OrderProduct } from 'src/entities/order_product';
import { Repository } from 'typeorm';
import { ClientService } from '../client/client.service';
import { OrderProductService } from '../order_products/order_product.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly clientService: ClientService,
    private readonly orderProductService: OrderProductService,
  ) {}

  async create(
    clientId: number,
    products: Partial<OrderProduct>[],
  ): Promise<Order> {
    const client = await this.clientService.getById(clientId);

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    const newOrder = this.orderRepository.create({
      client,
      created_at: new Date(),
      updated_at: new Date(),
    });

    const savedOrder = await this.orderRepository.save(newOrder);

    const productsWithOrder = products.map((product) => ({
      ...product,
      order: savedOrder,
      created_at: new Date(),
      updated_at: new Date(),
    }));

    await this.orderProductService.addProductsInBulk(productsWithOrder);

    return savedOrder;
  }

  async getAll() {
    return this.orderRepository.find();
  }

  async update(id: number, updatedData: { client_id: number }): Promise<Order> {
    const order = await this.orderRepository.findOneBy({ id });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const updatedOrder = this.orderRepository.merge(order, {
      ...updatedData,
      updated_at: new Date(),
    });

    return this.orderRepository.save(updatedOrder);
  }

  async delete(id: number) {
    const order = await this.orderRepository.findOneBy({ id });

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    await this.orderRepository.remove(order);

    return { message: 'Order deleted successfully' };
  }
}
