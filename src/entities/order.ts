import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Client } from './client';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Client, { eager: false })
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  constructor() {}
}
