import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';

@Entity('products')
export class Part {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  sku: string;

  @Column()
  name: string;

  @Column({ unique: true })
  trtCode: string;

  @Column('simple-array', { nullable: true })
  marka: string[];

  @Column('simple-array', { nullable: true })
  model: string[];

  @Column('simple-array', { nullable: true })
  oem: string[];

  @Column('simple-array', { nullable: true })
  year: number[];

  @Column({ nullable: true })
  country: string;

  @Column('simple-array', { nullable: true })
  brand: string[];

  @Column({ default: 'шт' })
  baseUnit: string;

  @ManyToMany(() => Category, (category) => category.parts, { cascade: true })
  @JoinTable()
  categories: Category[];

  @Column({ nullable: true })
  price: number;

  @Column('simple-array', { nullable: true })
  images: string[];

  @Column({ default: true })
  inStock: boolean;
}