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
import { OrderProductService } from './order_product.service';

@Controller('order')
export class OrderProductController {
  constructor(private orderProductService: OrderProductService) {}
}
