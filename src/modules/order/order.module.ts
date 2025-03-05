import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entities/order';
import { OrderService } from './order.service';
import { Client } from 'src/entities/client';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forFeature([Client]),
  ],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
