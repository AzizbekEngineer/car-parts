import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
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

  @Column('text', { array: true, nullable: true })
  year: string[];

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

  @ManyToMany(() => Category, (category) => category.parts, { cascade: true })
  @JoinTable()
  categories: Category[];

  @Column({ nullable: true })
  price: number;

  @Column('text', { array: true, nullable: true })
  images: string[];

  @Column({ default: true })
  inStock: boolean;
}