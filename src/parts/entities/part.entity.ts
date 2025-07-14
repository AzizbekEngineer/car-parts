import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Brand } from 'src/brands/entities/brand.entity';
import { Car } from 'src/cars/entities/car.entity';
import { OEM } from '../../oem/entities/oem.entity';

@Entity('products')
export class Part {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sku: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  visibilityInCatalog: string;

  @Column()
  language: string;

  @Column({ nullable: true })
  translationGroup: number;

  @Column({ nullable: true })
  shortDescription: string;

  @Column({ nullable: true })
  description: string; 

  @Column({ default: true })
  inStock: boolean;

  @ManyToMany(() => Category, (category) => category.parts, { onDelete: "CASCADE" })
  @JoinTable()
  categories: Category[];

  @ManyToMany(() => Brand, (brand) => brand.parts)
  @JoinTable()
  brands: Brand[];

  @ManyToMany(() => Car, (car) => car.parts)
  @JoinTable()
  cars: Car[];

  @ManyToMany(() => OEM, (oem) => oem.parts)
  @JoinTable()
  oems: OEM[];

  @Column('simple-array', { nullable: true })
  images: string[]; 
  
  @Column('simple-array', { nullable: true })
  models: string[]; 

  @Column({ nullable: true })
  price: number;

  @Column({ nullable: true })
  trtCode: string;

  @Column({ nullable: true })
  imgUrl: string;

  @Column({ nullable: true })
  year: number;
}