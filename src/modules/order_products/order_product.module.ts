import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entities/order';
import { Client } from 'src/entities/client';
import { OrderProductService } from './order_product.service';
import { OrderProduct } from 'src/entities/order_product';

@Module({
  imports: [TypeOrmModule.forFeature([OrderProduct])],
  providers: [OrderProductService],
  exports: [OrderProductService],
})
export class OrderProductModule {}
