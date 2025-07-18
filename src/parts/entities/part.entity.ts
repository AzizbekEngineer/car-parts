import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';

@Entity('products')
export class Part {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  sku: string;

  @Column()
  name: string;

  @Column({ unique: true })
  trtCode: string;

  @Column('text', { array: true, nullable: true })
  marka: string[];

  @Column('int', { array: true, nullable: true }) // yil raqamlar — number emas int
  year: number[];

  @Column('text', { array: true, nullable: true })
  oem: string[];

  @Column('text', { array: true, nullable: true })
  brand: string[];

  @Column('text', { array: true, nullable: true })
  model: string[];

  @Column({ nullable: true })
  country: string;

  @Column({ default: 'шт' })
  baseUnit: string;

  @ManyToMany(() => Category, (category) => category.parts)
  categories: Category[];

  @Column({ nullable: true })
  price: number;

  @Column('text', { array: true, nullable: true })
  images: string[];

  @Column({ default: true })
  inStock: boolean;
}
