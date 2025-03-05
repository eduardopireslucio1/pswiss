import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/entities/client';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async create(name: string, ref: string): Promise<Client> {
    const newClient = this.clientRepository.create({
      name,
      ref,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return this.clientRepository.save(newClient);
  }

  async getAll() {
    return this.clientRepository.find();
  }

  async update(
    id: number,
    updatedData: { name: string; ref: string },
  ): Promise<Client> {
    const client = await this.clientRepository.findOneBy({ id });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    const updatedClient = this.clientRepository.merge(client, {
      ...updatedData,
      updated_at: new Date(),
    });

    return this.clientRepository.save(updatedClient);
  }

  async delete(id: number) {
    const client = await this.clientRepository.findOneBy({ id });

    if (!client) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }

    await this.clientRepository.remove(client);

    return { message: 'Client deleted successfully' };
  }
}
