import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/entities/client';
import { Order } from 'src/entities/order';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async create(clientId: number): Promise<Order> {
    const client = await this.clientRepository.findOneBy({ id: clientId });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    const newOrder = this.orderRepository.create({
      client,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return this.orderRepository.save(newOrder);
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
