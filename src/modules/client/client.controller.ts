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

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body('name') name: string,
    @Body('ref') ref: string,
  ) {
    try {
      const result = await this.clientService.update(id, { name, ref });

      return result;
    } catch (error) {
      throw new HttpException(
        'Error to update client at ClientController',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    try {
      const result = await this.clientService.delete(id);
      return result;
    } catch (error) {
      throw new HttpException(
        'Error to delete client at ClientController',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
