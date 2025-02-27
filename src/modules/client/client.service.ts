import { Injectable } from '@nestjs/common';
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
    });

    return this.clientRepository.save(newClient);
  }

  async getAll() {
    return this.clientRepository.find();
  }
}
