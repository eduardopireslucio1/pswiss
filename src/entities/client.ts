import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  ref: string;

  @Column()
  created_at: Date;

  constructor(name: string, ref: string) {
    this.name = name;
    this.ref = ref;
  }
}
