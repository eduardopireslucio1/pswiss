import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderProduct } from 'src/entities/order_product';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('/')
  async create(
    @Body('client_id') clientId: number,
    @Body('products') products: OrderProduct[],
  ) {
    try {
      const result = await this.orderService.create(clientId, products);

      return result;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error to create order at OrderController',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/')
  async getAll() {
    try {
      const result = await this.orderService.getAll();

      return result;
    } catch (error) {
      throw new HttpException(
        'Error to getAll at OrderController',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body('client_id') client_id: number) {
    try {
      const result = await this.orderService.update(id, {
        client_id,
      });

      return result;
    } catch (error) {
      throw new HttpException(
        'Error to update order at OrderController',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    try {
      const result = await this.orderService.delete(id);
      return result;
    } catch (error) {
      throw new HttpException(
        'Error to delete order at OrderController',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
