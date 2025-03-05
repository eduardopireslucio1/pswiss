import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  identification: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  constructor(name: string, identification: string) {
    this.name = name;
    this.identification = identification;
  }
}
