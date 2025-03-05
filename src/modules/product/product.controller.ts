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
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('/')
  async create(
    @Body('name') name: string,
    @Body('identification') identification: string,
  ) {
    try {
      const result = await this.productService.create(name, identification);

      return result;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error to create product at ProductController',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/')
  async getAll() {
    try {
      const result = await this.productService.getAll();

      return result;
    } catch (error) {
      throw new HttpException(
        'Error to getAll at ProductController',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body('name') name: string,
    @Body('identification') identification: string,
  ) {
    try {
      const result = await this.productService.update(id, {
        name,
        identification,
      });

      return result;
    } catch (error) {
      throw new HttpException(
        'Error to update product at ProductController',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    try {
      const result = await this.productService.delete(id);
      return result;
    } catch (error) {
      throw new HttpException(
        'Error to delete product at ProductController',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
