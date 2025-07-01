import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Part } from '../../parts/entities/part.entity';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  model: string;

  @Column()
  years: string;

  @ManyToMany(() => Part, (part) => part.cars)
  parts: Part[];
}
