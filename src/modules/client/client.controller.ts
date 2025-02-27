import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Post('/')
  async create(@Body('name') name: string, @Body('ref') ref: string) {
    try {
      const result = await this.clientService.create(name, ref);

      return result;
    } catch (error) {
      console.log(error);

      throw new HttpException(
        'Error to create client at ClientController',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/')
  async getAll() {
    try {
      const result = await this.clientService.getAll();

      return result;
    } catch (error) {
      throw new HttpException(
        'Error to getAll at ClientController',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
