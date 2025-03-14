import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entities/order';
import { OrderService } from './order.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
