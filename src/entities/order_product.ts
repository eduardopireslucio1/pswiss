import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from './order';
import { Product } from './product';

@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, { eager: false })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Product, { eager: false })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  //VRAC, CUIT, SOUPE
  @Column()
  format: string;

  //Désignation
  @Column()
  designation: string;

  //Taille
  @Column()
  size: string;

  //Quantité
  @Column()
  amount: number;

  // BIO GRTA, GRTA, CH, IMPORT
  @Column()
  classification_type: string;

  //OBS
  @Column()
  observation: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  constructor() {}
}
